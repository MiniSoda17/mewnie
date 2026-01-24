import React, { createContext, useContext, ReactNode } from 'react';

interface StepGoalContextType {
    stepGoal: number;
}

const StepGoalContext = createContext<StepGoalContextType | undefined>(undefined);

const STEP_GOAL = 8000;

export function StepGoalProvider({ children }: { children: ReactNode }) {
    return (
        <StepGoalContext.Provider value={{ stepGoal: STEP_GOAL }}>
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
