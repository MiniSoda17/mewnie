import React from 'react';
import { StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MewnieMood } from './MewniePet';
import RainEffect from './RainEffect';

interface EnvironmentBackgroundProps {
    mood: MewnieMood;
    children: React.ReactNode;
}

// Gradient colors for each mood (fallback when no image is set)
const moodGradients = {
    tired: {
        colors: ['#3D4852', '#5A6978', '#7A8A9A'] as const,
        // Darker, gloomy, rainy day feel
    },
    neutral: {
        colors: ['#87CEEB', '#98D8C8', '#7EC8A3'] as const,
        // Pleasant sky to meadow gradient
    },
    happy: {
        colors: ['#87CEEB', '#FFE4B5', '#FFD700'] as const,
        // Sunny sky with golden tones
    },
};

// Optional: Image backgrounds (you can add these later)
// Place images in assets/backgrounds/ and uncomment to use
const moodBackgrounds: Record<MewnieMood, ImageSourcePropType | null> = {
    tired: null, // require('@/assets/backgrounds/rainy.png'),
    neutral: null, // require('@/assets/backgrounds/meadow.png'),
    happy: null, // require('@/assets/backgrounds/sunny.png'),
};

export default function EnvironmentBackground({ mood, children }: EnvironmentBackgroundProps) {
    const gradient = moodGradients[mood];
    const backgroundImage = moodBackgrounds[mood];

    // If we have a background image, use it
    if (backgroundImage) {
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    {mood === 'tired' && <RainEffect />}
                    {children}
                </View>
            </ImageBackground>
        );
    }

    // Otherwise, use gradient
    return (
        <LinearGradient
            colors={[...gradient.colors]}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            {/* Rain effect for tired mood */}
            {mood === 'tired' && <RainEffect />}

            {/* Ground/Floor area */}
            <View style={styles.groundContainer}>
                <View style={[styles.ground, { backgroundColor: getGroundColor(mood) }]} />
            </View>

            {/* Main content */}
            <View style={styles.content}>
                {children}
            </View>
        </LinearGradient>
    );
}

function getGroundColor(mood: MewnieMood): string {
    switch (mood) {
        case 'tired':
            return '#4A5568'; // Dark gray - muddy ground
        case 'neutral':
            return '#7EC8A3'; // Green - grass
        case 'happy':
            return '#90EE90'; // Bright green - lush grass
        default:
            return '#7EC8A3';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    content: {
        flex: 1,
        zIndex: 2,
    },
    groundContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        zIndex: 0,
    },
    ground: {
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        opacity: 0.4,
    },
});

