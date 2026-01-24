import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  useAnimatedStyle,
  withTiming, 
  withSpring,
  useDerivedValue,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { useState } from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface StatsCardProps {
  steps: number;
  goal: number;
}

// Animated Circular Progress Component
interface CircularProgressProps {
  progress: number; // 0-100 for visual
  actualProgress: number; // Can be over 100 for display
  size: number;
  strokeWidth: number;
}

function CircularProgress({ progress, actualProgress, size, strokeWidth }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const isComplete = actualProgress >= 100;
  
  // Animated progress value for circle (capped at 100%)
  const animatedProgress = useSharedValue(0);
  // Animated actual progress for percentage display (can go over 100)
  const animatedActualProgress = useSharedValue(0);
  // Scale animation for achievement pop
  const scale = useSharedValue(1);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [hasAnimatedPop, setHasAnimatedPop] = useState(false);
  
  useEffect(() => {
    // Animate progress - cap visual at 100%
    const visualProgress = Math.min(actualProgress, 100);
    animatedProgress.value = withTiming(visualProgress, { 
      duration: 2500, 
      easing: Easing.out(Easing.cubic) 
    });
    animatedActualProgress.value = withTiming(actualProgress, { 
      duration: 2500, 
      easing: Easing.out(Easing.cubic) 
    });
  }, [progress, actualProgress]);

  // Pop animation when hitting 100%
  useEffect(() => {
    if (isComplete && !hasAnimatedPop) {
      // Delay the pop to sync with progress animation
      const timeout = setTimeout(() => {
        scale.value = withSpring(1.15, { damping: 8, stiffness: 400 });
        setTimeout(() => {
          scale.value = withSpring(1, { damping: 10, stiffness: 300 });
        }, 200);
      }, 2000); // Trigger near end of progress animation
      setHasAnimatedPop(true);
      return () => clearTimeout(timeout);
    }
  }, [isComplete]);

  // Animate the percentage text
  useDerivedValue(() => {
    runOnJS(setDisplayPercent)(Math.round(animatedActualProgress.value));
  });

  // Animated props for the progress circle
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (animatedProgress.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  return (
    <Animated.View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, animatedContainerStyle]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* White Background Track - full circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle (capped at 100% visually) */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isComplete ? '#5CB85C' : '#DC3545'}
          strokeWidth={strokeWidth - 2}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      {/* Percentage Text in Center */}
      <View style={styles.percentageContainer}>
        <Text style={[styles.percentageText, isComplete ? styles.percentageComplete : styles.percentageIncomplete]}>
          {displayPercent}
        </Text>
        <Text style={[styles.percentageSymbol, isComplete ? styles.percentageComplete : styles.percentageIncomplete]}>%</Text>
      </View>
    </Animated.View>
  );
}

// Animated counter component for step count
function AnimatedCounter({ value }: { value: number }) {
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, { 
      duration: 2500, 
      easing: Easing.out(Easing.cubic) 
    });
  }, [value]);

  useDerivedValue(() => {
    runOnJS(setDisplayValue)(Math.round(animatedValue.value));
  });

  return <Text style={styles.count}>{displayValue.toLocaleString()}</Text>;
}

export default function StatsCard({ steps, goal }: StatsCardProps) {
  const progress = (steps / goal) * 100; // Allow over 100%
  const displayProgress = Math.min(progress, 100); // Cap visual at 100%

  return (
    <BlurView intensity={120} tint="light" style={styles.container}>
      <View style={styles.contentRow}>
        {/* Left Side: Steps Info */}
        <View style={styles.leftContent}>
          <Text style={styles.title}>STEPS TODAY</Text>
          <View style={styles.countRow}>
            <AnimatedCounter value={steps} />
          </View>
          <Text style={styles.goal}>of {goal.toLocaleString()} goal</Text>
        </View>
        
        {/* Right Side: Circular Progress */}
        <CircularProgress progress={displayProgress} actualProgress={progress} size={90} strokeWidth={12} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 24,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    alignSelf: 'center',
    marginBottom: 40,
    // Liquid glass shadow
    shadowColor: 'rgba(255,255,255,0.5)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftContent: {
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Quicksand_600SemiBold',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 4,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  count: {
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
    fontSize: 38,
    letterSpacing: -1,
  },
  goal: {
    fontFamily: 'Quicksand_500Medium',
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    marginTop: 2,
  },
  percentageContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  percentageText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
    color: '#2E7D32', // Darker green for readability
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  percentageSymbol: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 11,
    color: '#2E7D32', // Darker green
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  percentageComplete: {
    color: '#2E7D32', // Darker green for readability
  },
  percentageIncomplete: {
    color: '#B71C1C', // Darker red for readability
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
