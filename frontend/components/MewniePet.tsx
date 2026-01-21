import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
} from 'react-native-reanimated';

export type MewnieMood = 'tired' | 'neutral' | 'happy';

interface MewniePetProps {
    mood: MewnieMood;
    size?: number;
}

const moodConfig = {
    tired: {
        emoji: '😿',
        backgroundColor: '#E8E8F0',
        borderColor: '#A0A0B0',
    },
    neutral: {
        emoji: '🐱',
        backgroundColor: '#FFF5E6',
        borderColor: '#D4A574',
    },
    happy: {
        emoji: '😸',
        backgroundColor: '#FFF9E6',
        borderColor: '#FFD700',
    },
};

export default function MewniePet({ mood, size = 200 }: MewniePetProps) {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        // Different animations based on mood
        if (mood === 'tired') {
            // Slow breathing effect
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0.98, { duration: 2000, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
            rotation.value = withRepeat(
                withSequence(
                    withTiming(-3, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
                    withTiming(3, { duration: 3000, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
            translateY.value = 0;
        } else if (mood === 'neutral') {
            // Gentle idle animation
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.03, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0.97, { duration: 1500, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
            rotation.value = 0;
            translateY.value = withRepeat(
                withSequence(
                    withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
                    withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
        } else {
            // Happy bouncing animation
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 300, easing: Easing.out(Easing.back(2)) }),
                    withTiming(1, { duration: 300, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
            rotation.value = withRepeat(
                withSequence(
                    withTiming(-8, { duration: 200, easing: Easing.inOut(Easing.sin) }),
                    withTiming(8, { duration: 400, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0, { duration: 200, easing: Easing.inOut(Easing.sin) })
                ),
                -1,
                true
            );
            translateY.value = withRepeat(
                withSequence(
                    withTiming(-15, { duration: 300, easing: Easing.out(Easing.quad) }),
                    withTiming(0, { duration: 300, easing: Easing.in(Easing.quad) })
                ),
                -1,
                true
            );
        }
    }, [mood, scale, rotation, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { rotate: `${rotation.value}deg` },
                { translateY: translateY.value },
            ],
        };
    });

    const config = moodConfig[mood];

    return (
        <Animated.View
            style={[
                styles.container,
                animatedStyle,
                {
                    width: size,
                    height: size,
                    backgroundColor: config.backgroundColor,
                    borderColor: config.borderColor,
                },
            ]}
        >
            <Text style={[styles.emoji, { fontSize: size * 0.4 }]}>{config.emoji}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 4,
    },
    emoji: {
        textAlign: 'center',
    },
});
