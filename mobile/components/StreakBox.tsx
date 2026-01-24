import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface StreakBoxProps {
  streak: number;
}

export default function StreakBox({ streak }: StreakBoxProps) {
  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <FontAwesome name="fire" size={20} color="#FF6B35" />
      <Text style={styles.streakNumber}>{streak}</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // Liquid glass shadow
    shadowColor: 'rgba(255,255,255,0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  streakNumber: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
    color: '#FF6B35',
    marginTop: 2,
  },
});
