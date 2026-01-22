import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoBackgroundProps {
  /**
   * Source for the video background.
   * Can be a require('path/to/video.mp4') or { uri: 'https://...' }
   */
  videoSource?: any;
  /**
   * Source for a static image background (alternative to video).
   * Can be a require('path/to/image.png') or { uri: 'https://...' }
   * If provided, this takes precedence over videoSource.
   */
  imageSource?: any;
}

export default function VideoBackground({ videoSource, imageSource }: VideoBackgroundProps) {
  // 1. If Image is provided, render static image
  if (imageSource) {
    return (
      <View style={styles.container}>
        <Image
          source={imageSource}
          style={styles.media}
          resizeMode="cover"
        />
      </View>
    );
  }

  // 2. Default Video Logic
  // Default to a sample calming nature video if no source provided
  const defaultVideo = { uri: 'https://videos.pexels.com/video-files/5829148/5829148-hd_1080_1920_30fps.mp4' };
  
  return (
    <View style={styles.container}>
      <Video
        style={styles.media}
        source={videoSource || defaultVideo}
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for contrast
  },
});
