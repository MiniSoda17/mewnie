import { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>('checking');
  const [todaySteps, setTodaySteps] = useState<number>(0);
  const [currentSteps, setCurrentSteps] = useState<number>(0);

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

  // Determine pet mood based on steps
  const getPetMood = () => {
    if (totalSteps >= 10000) return { emoji: '😸', text: 'Energetic!' };
    if (totalSteps >= 5000) return { emoji: '😺', text: 'Happy' };
    if (totalSteps >= 2000) return { emoji: '🐱', text: 'Content' };
    return { emoji: '😿', text: 'Sleepy' };
  };

  const petMood = getPetMood();

  return (
    <View style={styles.container}>
      {/* Mewnie Pet Container */}
      <View style={styles.petContainer}>
        <View style={styles.petPlaceholder}>
          <Text style={styles.petEmoji}>{petMood.emoji}</Text>
          <Text style={styles.placeholderText}>Mewnie</Text>
          <Text style={styles.moodText}>{petMood.text}</Text>
        </View>
      </View>

      {/* Steps Display */}
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsLabel}>Today's Steps</Text>
        <Text style={styles.stepsCount}>{totalSteps.toLocaleString()}</Text>
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
  petPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  petEmoji: {
    fontSize: 64,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
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
  unavailableText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 8,
  },
  noteText: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },

});
