import { StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { useStepGoal } from '@/contexts/StepGoalContext';
import { useDebugSteps } from '@/contexts/DebugStepsContext';

// Mock user data - in a real app this would come from a context/API
const userData = {
    name: 'Alex',
    gender: 'Not specified',
    height: '170 cm',
    weight: '65 kg',
    birthDate: 'Jan 1, 2000',
};

export default function ProfileScreen() {
    const { stepGoal } = useStepGoal();
    const { manualSteps, isManualMode, setManualSteps, setIsManualMode } = useDebugSteps();

    const handleManualModeToggle = (enabled: boolean) => {
        setIsManualMode(enabled);
        if (enabled && manualSteps === null) {
            setManualSteps(0);
        }
    };

    const handleLogout = () => {
        // TODO: Implement actual logout logic
        console.log('Logout pressed');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    
                    {/* Profile Picture Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image 
                                source={require('@/assets/images/icon.png')}
                                style={styles.avatar}
                            />
                            <View style={styles.editBadge}>
                                <FontAwesome name="pencil" size={12} color="#fff" />
                            </View>
                        </View>
                        <Text style={styles.userName}>{userData.name}</Text>
                        <Text style={styles.userSubtitle}>Mewnie Trainer</Text>
                    </View>

                    {/* Personal Details Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Personal Details</Text>
                        
                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <FontAwesome name="user" size={16} color="#4A90D9" />
                            </View>
                            <Text style={styles.detailLabel}>Name</Text>
                            <Text style={styles.detailValue}>{userData.name}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <FontAwesome name="venus-mars" size={16} color="#4A90D9" />
                            </View>
                            <Text style={styles.detailLabel}>Gender</Text>
                            <Text style={styles.detailValue}>{userData.gender}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <FontAwesome name="arrows-v" size={16} color="#4A90D9" />
                            </View>
                            <Text style={styles.detailLabel}>Height</Text>
                            <Text style={styles.detailValue}>{userData.height}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <FontAwesome name="balance-scale" size={16} color="#4A90D9" />
                            </View>
                            <Text style={styles.detailLabel}>Weight</Text>
                            <Text style={styles.detailValue}>{userData.weight}</Text>
                        </View>

                        <View style={[styles.detailRow, styles.detailRowLast]}>
                            <View style={styles.detailIcon}>
                                <FontAwesome name="birthday-cake" size={16} color="#4A90D9" />
                            </View>
                            <Text style={styles.detailLabel}>Birth Date</Text>
                            <Text style={styles.detailValue}>{userData.birthDate}</Text>
                        </View>
                    </View>

                    {/* Step Goal Card - Display Only */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Daily Step Goal</Text>
                        
                        <View style={styles.goalDisplay}>
                            <FontAwesome name="flag-checkered" size={24} color="#4A90D9" />
                            <Text style={styles.goalValue}>{stepGoal.toLocaleString()}</Text>
                            <Text style={styles.goalUnit}>steps</Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={18} color="#E53935" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    {/* Debug Section - At the very bottom */}
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
                                    <Text style={styles.sliderLabelCenter}>5,000</Text>
                                    <Text style={styles.sliderLabel}>10,000</Text>
                                </View>
                            </>
                        )}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Softer distinct background
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 40,
    },
    
    // Profile Section
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 10,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
        shadowColor: '#4A90D9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 40, // Squircle shape
        backgroundColor: '#FFF',
    },
    editBadge: {
        position: 'absolute',
        bottom: -6,
        right: -6,
        backgroundColor: '#4A90D9',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#F5F7FA',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2D3436', // Softer dark gray
        marginBottom: 2,
    },
    userSubtitle: {
        fontSize: 14,
        color: '#8A959E', // Muted text
        letterSpacing: 0.5,
    },

    // Cards
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        // Very subtle shadow
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 1,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#B0B0C0', // Uppercase muted label
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Detail Rows
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5FA',
    },
    detailRowLast: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    detailIcon: {
        width: 36,
        height: 36,
        backgroundColor: '#F0F8FF', // Very light blue bg for icons
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    detailLabel: {
        flex: 1,
        fontSize: 15,
        color: '#5F6368', // Neutral gray
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2D3436',
    },

    // Goal Display
    goalDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: 24,
    },
    goalValue: {
        fontSize: 42,
        fontWeight: '800',
        color: '#4A90D9',
        letterSpacing: -1,
    },
    goalUnit: {
        fontSize: 14,
        color: '#8A959E',
        marginLeft: 8,
        fontWeight: '600',
    },

    // Preset Grid
    presetGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 8,
    },
    presetButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
    },
    presetButtonActive: {
        backgroundColor: '#4A90D9',
        shadowColor: '#4A90D9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    presetButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#8A959E',
    },
    presetButtonTextActive: {
        color: '#FFF',
    },

    // Custom Input
    customInputRow: {
        flexDirection: 'row',
        gap: 12,
    },
    customInput: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#2D3436',
        fontWeight: '600',
    },
    setButton: {
        backgroundColor: '#2D3436', // Dark accent for action
        paddingHorizontal: 28,
        borderRadius: 16,
        justifyContent: 'center',
    },
    setButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },

    // Logout Button
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        marginBottom: 32,
        gap: 8,
        opacity: 0.6,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FF6B6B',
    },

    // Debug Section
    debugSection: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 240, 200, 0.4)', // Very translucent pill
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 165, 0, 0.1)',
    },
    debugHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    debugTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#DAA520',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    debugValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#DAA520', // GoldenRod
        textAlign: 'center',
        marginVertical: 12,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -6,
    },
    sliderLabel: {
        fontSize: 10,
        color: '#DAA520',
        opacity: 0.6,
        fontWeight: '600',
    },
    sliderLabelCenter: {
        fontSize: 10,
        color: '#4A90D9',
        fontWeight: '700',
    },
});
