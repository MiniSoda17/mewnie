import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { Asset } from 'expo-asset';

interface LoadingScreenProps {
  onFinished: () => void;
}

// Assets to preload
const assetsToPreload = [
  require('@/assets/images/background.png'),
  require('@/assets/images/background-tired.png'),
  require('@/assets/images/app-logo.png'),
];

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    const loadAssets = async () => {
      const totalAssets = assetsToPreload.length;
      let loaded = 0;

      for (const asset of assetsToPreload) {
        try {
          await Asset.fromModule(asset).downloadAsync();
        } catch (error) {
          console.log('Error loading asset:', error);
        }
        loaded++;
        const newProgress = (loaded / totalAssets) * 100;
        setProgress(newProgress);
        progressWidth.value = withTiming(newProgress, { 
          duration: 300,
          easing: Easing.out(Easing.cubic)
        });
      }

      // Wait a moment for the animation to complete, then finish
      setTimeout(() => {
        onFinished();
      }, 500);
    };

    loadAssets();
  }, []);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Logo placeholder - replace with your actual logo */}
      <Image 
        source={require('@/assets/images/app-logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Loading text */}
      <Animated.Text style={styles.loadingText}>Loading...</Animated.Text>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  loadingText: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 16,
    color: '#FF69B4',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#FFE4EC',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF69B4', // Pink
    borderRadius: 4,
  },
});
