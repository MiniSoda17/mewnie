import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

import { Text, View } from '@/components/Themed';
import { useStepGoal } from '@/contexts/StepGoalContext';
import { useDebugSteps } from '@/contexts/DebugStepsContext';

const PRESET_GOALS = [2000, 5000, 7500, 10000, 15000];

export default function ProfileScreen() {
    const { stepGoal, setStepGoal } = useStepGoal();
    const { manualSteps, isManualMode, setManualSteps, setIsManualMode } = useDebugSteps();
    const [customGoal, setCustomGoal] = useState(stepGoal.toString());

    const handlePresetSelect = (goal: number) => {
        setStepGoal(goal);
        setCustomGoal(goal.toString());
    };

    const handleCustomGoalSubmit = () => {
        const goal = parseInt(customGoal, 10);
        if (!isNaN(goal) && goal > 0) {
            setStepGoal(goal);
        }
    };

    const handleManualModeToggle = (enabled: boolean) => {
        setIsManualMode(enabled);
        if (enabled && manualSteps === null) {
            setManualSteps(0);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.subtitle}>Set your daily step goal</Text>
                </View>

                {/* Current Goal Display */}
                <View style={styles.currentGoalCard}>
                    <Text style={styles.currentGoalLabel}>Current Goal</Text>
                    <Text style={styles.currentGoalValue}>{stepGoal.toLocaleString()}</Text>
                    <Text style={styles.currentGoalUnit}>steps per day</Text>
                </View>

                {/* Preset Goals */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Select</Text>
                    <View style={styles.presetGrid}>
                        {PRESET_GOALS.map((goal) => (
                            <TouchableOpacity
                                key={goal}
                                style={[
                                    styles.presetButton,
                                    stepGoal === goal && styles.presetButtonActive,
                                ]}
                                onPress={() => handlePresetSelect(goal)}
                            >
                                <Text
                                    style={[
                                        styles.presetButtonText,
                                        stepGoal === goal && styles.presetButtonTextActive,
                                    ]}
                                >
                                    {goal.toLocaleString()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Custom Goal */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Goal</Text>
                    <View style={styles.customInputRow}>
                        <TextInput
                            style={styles.customInput}
                            value={customGoal}
                            onChangeText={setCustomGoal}
                            keyboardType="number-pad"
                            placeholder="Enter steps"
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity
                            style={styles.setButton}
                            onPress={handleCustomGoalSubmit}
                        >
                            <Text style={styles.setButtonText}>Set</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Debug: Manual Steps Override */}
                <View style={styles.debugSection}>
                    <View style={styles.debugHeader}>
                        <Text style={styles.debugTitle}>🧪 Debug: Manual Steps</Text>
                        <Switch
                            value={isManualMode}
                            onValueChange={handleManualModeToggle}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isManualMode ? '#4A90D9' : '#f4f3f4'}
                        />
                    </View>
                    {isManualMode && (
                        <>
                            <Text style={styles.debugValue}>
                                {(manualSteps ?? 0).toLocaleString()} steps
                            </Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10000}
                                step={100}
                                value={manualSteps ?? 0}
                                onValueChange={(value: number) => setManualSteps(value)}
                                minimumTrackTintColor="#4A90D9"
                                maximumTrackTintColor="#ddd"
                                thumbTintColor="#4A90D9"
                            />
                            <View style={styles.sliderLabels}>
                                <Text style={styles.sliderLabel}>0</Text>
                                <Text style={styles.sliderLabelCenter}>5,000 (neutral)</Text>
                                <Text style={styles.sliderLabel}>10,000</Text>
                            </View>
                            <Text style={styles.debugHint}>
                                Below 5,000 = tired pet • Above 5,000 = neutral pet
                            </Text>
                        </>
                    )}
                </View>

                {/* Goal Tips */}
                <View style={styles.tipsSection}>
                    <Text style={styles.tipsTitle}>💡 Goal Tips</Text>
                    <Text style={styles.tipText}>• 2,000 steps ≈ 1 mile walked</Text>
                    <Text style={styles.tipText}>• 5,000 steps is a moderate daily goal</Text>
                    <Text style={styles.tipText}>• 10,000 steps is great for fitness</Text>
                    <Text style={styles.tipText}>• Your Mewnie gets happier as you walk!</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    currentGoalCard: {
        backgroundColor: '#4A90D9',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
    },
    currentGoalLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    currentGoalValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
    },
    currentGoalUnit: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    presetGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    presetButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#4A90D9',
        backgroundColor: 'transparent',
    },
    presetButtonActive: {
        backgroundColor: '#4A90D9',
    },
    presetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A90D9',
    },
    presetButtonTextActive: {
        color: '#fff',
    },
    customInputRow: {
        flexDirection: 'row',
        gap: 10,
    },
    customInput: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 18,
        color: '#333',
    },
    setButton: {
        backgroundColor: '#4A90D9',
        paddingHorizontal: 24,
        borderRadius: 12,
        justifyContent: 'center',
    },
    setButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    tipsSection: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    tipText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        lineHeight: 20,
    },
    debugSection: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FFB74D',
    },
    debugHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    debugTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E65100',
    },
    debugValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E65100',
        textAlign: 'center',
        marginVertical: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -8,
    },
    sliderLabel: {
        fontSize: 12,
        color: '#666',
    },
    sliderLabelCenter: {
        fontSize: 12,
        color: '#4A90D9',
        fontWeight: '600',
    },
    debugHint: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        fontStyle: 'italic',
    },
});
