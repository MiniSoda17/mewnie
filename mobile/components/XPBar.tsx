import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export default function XPBar({ currentXP, maxXP, level }: XPBarProps) {
  const progress = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
        
        <View style={styles.barContainer}>
          <View style={styles.textRow}>
            <Text style={styles.label}>XP</Text>
            <Text style={styles.values}>{currentXP}/{maxXP}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    // Liquid glass shadow
    shadowColor: 'rgba(255,255,255,0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700', // Gold
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8B4513',
  },
  barContainer: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#333',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  values: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00BFFF', // Deep Sky Blue
    borderRadius: 4,
  },
});
