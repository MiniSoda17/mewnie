import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

interface StatsCardProps {
  steps: number;
  goal: number;
}

export default function StatsCard({ steps, goal }: StatsCardProps) {
  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>STEPS TODAY</Text>
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      </View>
      
      <View style={styles.countRow}>
        <Text style={styles.count}>{steps.toLocaleString()}</Text>
        <Text style={styles.goal}>/ {goal.toLocaleString()}</Text>
      </View>

      <View style={styles.progressBg}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress}%`, backgroundColor: progress >= 100 ? '#4CAF50' : '#4A90D9' }
          ]} 
        />
      </View>
      
      {/* Optional: Add calories or distance placeholders if needed later */}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 40, // Space from bottom
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  percentage: {
    color: '#4A90D9',
    fontWeight: '700',
    fontSize: 14,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  count: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
  },
  goal: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressBg: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  }
});
