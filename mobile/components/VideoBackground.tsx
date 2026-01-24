import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type PetMood = 'tired' | 'neutral';

/**
 * Configuration for each mood's background media.
 * You can set either imageSource OR videoSource for each mood.
 * If both are set, imageSource takes precedence.
 */
interface MoodMediaConfig {
  imageSource?: any;
  videoSource?: any;
}

// Define background media for each mood state
const moodBackgrounds: Record<PetMood, MoodMediaConfig> = {
  tired: {
    videoSource: require('@/assets/videos/background-tired-vid.mp4'),
  },
  neutral: {
    videoSource: require('@/assets/videos/background-vid.mp4'),
  },
};

interface VideoBackgroundProps {
  mood?: PetMood;
  videoSource?: any;
  imageSource?: any;
}

export default function VideoBackground({ mood = 'neutral', videoSource, imageSource }: VideoBackgroundProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const opacity = useSharedValue(0);
  
  // Get the media config for the current mood
  const moodMedia = moodBackgrounds[mood];
  
  // Priority: direct props > mood-based config
  const finalImageSource = imageSource ?? moodMedia.imageSource;
  const finalVideoSource = videoSource ?? moodMedia.videoSource;

  const handleVideoLoad = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsVideoReady(true);
      opacity.value = withTiming(1, { duration: 500 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // 1. If Image is available, render static image
  if (finalImageSource) {
    return (
      <View style={styles.container}>
        <Image
          source={finalImageSource}
          style={styles.media}
          resizeMode="cover"
        />
      </View>
    );
  }

  // 2. Video Logic with fade-in
  const defaultVideo = { uri: 'https://videos.pexels.com/video-files/5829148/5829148-hd_1080_1920_30fps.mp4' };
  
  return (
    <View style={styles.container}>
      {/* Placeholder background color while video loads */}
      <View style={styles.placeholder} />
      
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Video
          style={styles.media}
          source={finalVideoSource || defaultVideo}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted={true}
          onPlaybackStatusUpdate={handleVideoLoad}
        />
      </Animated.View>
      
      {/* Overlay to ensure text readability */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#A8D5A2', // Light green to match your nature backgrounds
  },
  media: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
