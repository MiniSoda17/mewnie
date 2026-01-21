import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StepGoalContextType {
    stepGoal: number;
    setStepGoal: (goal: number) => Promise<void>;
}

const StepGoalContext = createContext<StepGoalContextType | undefined>(undefined);

const STEP_GOAL_KEY = '@mewnie_step_goal';
const DEFAULT_STEP_GOAL = 5000;

export function StepGoalProvider({ children }: { children: ReactNode }) {
    const [stepGoal, setStepGoalState] = useState<number>(DEFAULT_STEP_GOAL);

    // Load saved goal on mount
    useEffect(() => {
        const loadGoal = async () => {
            try {
                const saved = await AsyncStorage.getItem(STEP_GOAL_KEY);
                if (saved) {
                    setStepGoalState(parseInt(saved, 10));
                }
            } catch (error) {
                console.log('Error loading step goal:', error);
            }
        };
        loadGoal();
    }, []);

    const setStepGoal = async (goal: number) => {
        try {
            await AsyncStorage.setItem(STEP_GOAL_KEY, goal.toString());
            setStepGoalState(goal);
        } catch (error) {
            console.log('Error saving step goal:', error);
        }
    };

    return (
        <StepGoalContext.Provider value={{ stepGoal, setStepGoal }}>
            {children}
        </StepGoalContext.Provider>
    );
}

export function useStepGoal() {
    const context = useContext(StepGoalContext);
    if (!context) {
        throw new Error('useStepGoal must be used within a StepGoalProvider');
    }
    return context;
}
