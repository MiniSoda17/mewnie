import { useEffect, useState } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/Themed';
import VideoBackground from '@/components/VideoBackground';
import XPBar from '@/components/XPBar';
import StatsCard from '@/components/StatsCard';
import { useStepGoal } from '@/contexts/StepGoalContext';

export default function HomeScreen() {
  const [todaySteps, setTodaySteps] = useState<number>(0);
  const [currentSteps, setCurrentSteps] = useState<number>(0);
  const { stepGoal } = useStepGoal();

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();

      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        try {
          const result = await Pedometer.getStepCountAsync(start, end);
          if (result) {
            setTodaySteps(result.steps);
          }
        } catch (error) {
          console.log('Error getting step count:', error);
        }

        subscription = Pedometer.watchStepCount((result) => {
          setCurrentSteps(result.steps);
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const totalSteps = todaySteps + currentSteps;

  // Gamification Logic (Mock Levels)
  const XP_PER_LEVEL = 2000;
  const level = Math.floor(totalSteps / XP_PER_LEVEL) + 1;
  const currentXP = totalSteps % XP_PER_LEVEL;

  return (
    <View style={styles.container}>
      <VideoBackground imageSource={require('@/assets/images/background.png')}/>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section: XP Bar */}
        <View style={styles.topSection}>
          <XPBar currentXP={currentXP} maxXP={XP_PER_LEVEL} level={level} />
        </View>

        {/* Spacer - pushes stats to bottom */}
        <View style={styles.spacer} />

        {/* Bottom Section: Stats */}
        <View style={styles.bottomSection}>
          <StatsCard steps={totalSteps} goal={stepGoal} />
          
          {Platform.OS === 'android' && (
            <Text style={styles.noteText}>Pedometer requires dev build on Android</Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: 10,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingBottom: 20,
    width: '100%',
  },
  noteText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
