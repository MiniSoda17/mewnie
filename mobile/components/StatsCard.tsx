import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';

interface StatsCardProps {
  steps: number;
  goal: number;
}

// Circular Progress Component
interface CircularProgressProps {
  progress: number; // 0-100
  size: number;
  strokeWidth: number;
}

function CircularProgress({ progress, size, strokeWidth }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const isComplete = progress >= 100;
  
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* White Background Track - slightly thicker for subtle halo effect */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={strokeWidth + 4}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isComplete ? '#4CAF50' : '#5CB85C'}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Percentage Text in Center */}
      <View style={styles.percentageContainer}>
        <Text style={[styles.percentageText, isComplete && styles.percentageComplete]}>
          {Math.round(progress)}
        </Text>
        <Text style={[styles.percentageSymbol, isComplete && styles.percentageComplete]}>%</Text>
      </View>
    </View>
  );
}

export default function StatsCard({ steps, goal }: StatsCardProps) {
  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.contentRow}>
        {/* Left Side: Steps Info */}
        <View style={styles.leftContent}>
          <Text style={styles.title}>STEPS TODAY</Text>
          <View style={styles.countRow}>
            <Text style={styles.count}>{steps.toLocaleString()}</Text>
          </View>
          <Text style={styles.goal}>of {goal.toLocaleString()} goal</Text>
        </View>
        
        {/* Right Side: Circular Progress */}
        <CircularProgress progress={progress} size={90} strokeWidth={8} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 24,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 40,
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
    color: '#5CB85C',
  },
  percentageSymbol: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 11,
    color: '#5CB85C',
  },
  percentageComplete: {
    color: '#4CAF50',
  },
});
