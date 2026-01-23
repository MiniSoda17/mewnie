import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withDelay, 
    withRepeat, 
    withTiming, 
    Easing 
} from 'react-native-reanimated';

const CONFETTI_COLORS = ['#FFD700', '#FF6B6B', '#4CAF50', '#29B6F6', '#AB47BC'];
const NUM_PARTICLES = 30;

interface ParticleProps {
    index: number;
}

const Particle = ({ index }: ParticleProps) => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const rotation = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        // Randomize initial physics
        const delay = Math.random() * 500;
        const duration = 1500 + Math.random() * 1000;
        const xOffset = (Math.random() - 0.5) * 300;
        
        // Start animation
        translateY.value = withDelay(delay, withTiming(400, { duration, easing: Easing.out(Easing.quad) }));
        translateX.value = withDelay(delay, withTiming(xOffset, { duration }));
        rotation.value = withDelay(delay, withRepeat(withTiming(360, { duration: 1000 }), -1));
        opacity.value = withDelay(delay + duration - 500, withTiming(0, { duration: 500 }));
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
            { rotate: `${rotation.value}deg` }
        ],
        opacity: opacity.value,
        backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    }));

    return <Animated.View style={[styles.particle, style]} />;
};

export default function Confetti() {
    return (
        <View style={styles.container} pointerEvents="none">
            {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        overflow: 'hidden',
    },
    particle: {
        position: 'absolute',
        width: 8,
        height: 6,
        top: -20, // Start slightly above
        borderRadius: 2,
    },
});
