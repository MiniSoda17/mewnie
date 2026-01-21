import { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { Text, View } from '@/components/Themed';
import MewniePet, { MewnieMood } from '@/components/MewniePet';
import { useStepGoal } from '@/contexts/StepGoalContext';

export default function HomeScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>('checking');
  const [todaySteps, setTodaySteps] = useState<number>(0);
  const [currentSteps, setCurrentSteps] = useState<number>(0);
  const { stepGoal } = useStepGoal();

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    const subscribe = async () => {
      // Check if pedometer is available
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        // Get today's step count (iOS only - stores last 7 days)
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

        // Watch for live step updates (only works when app is in foreground)
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
  const progressPercent = Math.min((totalSteps / stepGoal) * 100, 100);

  // Determine pet mood based on progress towards goal (3 states)
  const getMewnieMood = (): { mood: MewnieMood; text: string } => {
    if (progressPercent >= 100) return { mood: 'happy', text: 'Goal Reached! 🎉' };
    if (progressPercent >= 50) return { mood: 'neutral', text: 'Halfway there!' };
    return { mood: 'tired', text: 'Let\'s get moving!' };
  };

  const { mood, text } = getMewnieMood();

  return (
    <View style={styles.container}>
      {/* Mewnie Pet Container */}
      <View style={styles.petContainer}>
        <MewniePet mood={mood} size={180} />
        <Text style={styles.placeholderText}>Mewnie</Text>
        <Text style={styles.moodText}>{text}</Text>
      </View>

      {/* Steps Display */}
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsLabel}>Today's Steps</Text>
        <Text style={styles.stepsCount}>{totalSteps.toLocaleString()}</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
                progressPercent >= 100 && styles.progressComplete
              ]}
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {Math.round(progressPercent)}%
            </Text>
            <Text style={styles.goalText}>
              Goal: {stepGoal.toLocaleString()}
            </Text>
          </View>
        </View>

        {isPedometerAvailable === 'false' && (
          <Text style={styles.unavailableText}>
            Pedometer not available on this device
          </Text>
        )}
        {Platform.OS === 'android' && (
          <Text style={styles.noteText}>
            Note: Pedometer requires a development build on Android
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    color: '#888',
  },
  moodText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  stepsContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  stepsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  stepsCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  progressContainer: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90D9',
    borderRadius: 6,
  },
  progressComplete: {
    backgroundColor: '#4CAF50',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90D9',
  },
  goalText: {
    fontSize: 14,
    color: '#888',
  },
  unavailableText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 12,
  },
  noteText: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
