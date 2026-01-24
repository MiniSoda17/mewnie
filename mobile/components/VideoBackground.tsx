import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

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
// To use a video instead: remove imageSource and add videoSource: require('@/assets/videos/tired.mp4')
const moodBackgrounds: Record<PetMood, MoodMediaConfig> = {
  tired: {
    // Add your tired/sad background here:
    // imageSource: require('@/assets/images/background-tired.png'),
    // OR for video:
    // videoSource: require('@/assets/videos/background-tired.mp4'),
    videoSource: require('@/assets/videos/background-tired-vid.mp4'), // Fallback to neutral for now
  },
  neutral: {
    // Use videoSource for video files, not imageSource
    videoSource: require('@/assets/videos/background-vid.mp4'),
  },
};

interface VideoBackgroundProps {
  /**
   * The pet's current mood, determines which background to show.
   * - 'tired': Shows sad/tired background (below 5000 steps)
   * - 'neutral': Shows neutral background (5000+ steps)
   */
  mood?: PetMood;
  /**
   * Optional override: Source for the video background.
   * Can be a require('path/to/video.mp4') or { uri: 'https://...' }
   */
  videoSource?: any;
  /**
   * Optional override: Source for a static image background.
   * Can be a require('path/to/image.png') or { uri: 'https://...' }
   * If provided, this takes precedence over videoSource.
   */
  imageSource?: any;
}

export default function VideoBackground({ mood = 'neutral', videoSource, imageSource }: VideoBackgroundProps) {
  // Get the media config for the current mood
  const moodMedia = moodBackgrounds[mood];
  
  // Priority: direct props > mood-based config
  const finalImageSource = imageSource ?? moodMedia.imageSource;
  const finalVideoSource = videoSource ?? moodMedia.videoSource;

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

  // 2. Video Logic
  // Default to a sample calming nature video if no source provided
  const defaultVideo = { uri: 'https://videos.pexels.com/video-files/5829148/5829148-hd_1080_1920_30fps.mp4' };
  
  return (
    <View style={styles.container}>
      <Video
        style={styles.media}
        source={finalVideoSource || defaultVideo}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted={true}
      />
      {/* Overlay to ensure text readability */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light overlay for slight contrast
  },
});
