import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const NUM_RAINDROPS = 30;

interface RainDropProps {
    delay: number;
    startX: number;
    duration: number;
}

function RainDrop({ delay, startX, duration }: RainDropProps) {
    const translateY = useSharedValue(-20);
    const opacity = useSharedValue(0);

    useEffect(() => {
        translateY.value = withDelay(
            delay,
            withRepeat(
                withTiming(SCREEN_HEIGHT + 20, {
                    duration: duration,
                    easing: Easing.linear,
                }),
                -1,
                false
            )
        );

        opacity.value = withDelay(
            delay,
            withRepeat(
                withTiming(0.7, { duration: 100 }),
                -1,
                false
            )
        );
    }, [delay, duration, translateY, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                styles.raindrop,
                { left: startX },
                animatedStyle,
            ]}
        />
    );
}

export default function RainEffect() {
    const raindrops = React.useMemo(() => {
        return Array.from({ length: NUM_RAINDROPS }, (_, i) => ({
            id: i,
            delay: Math.random() * 2000,
            startX: Math.random() * SCREEN_WIDTH,
            duration: 1000 + Math.random() * 1000,
        }));
    }, []);

    return (
        <View style={styles.container} pointerEvents="none">
            {raindrops.map((drop) => (
                <RainDrop
                    key={drop.id}
                    delay={drop.delay}
                    startX={drop.startX}
                    duration={drop.duration}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    raindrop: {
        position: 'absolute',
        width: 2,
        height: 15,
        backgroundColor: 'rgba(200, 220, 255, 0.6)',
        borderRadius: 2,
    },
});
