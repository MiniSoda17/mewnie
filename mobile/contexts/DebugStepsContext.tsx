import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebugStepsContextType {
    /** If set, overrides the real step count for testing */
    manualSteps: number | null;
    /** Enable/disable manual step override */
    isManualMode: boolean;
    /** Set the manual step count (or null to use real steps) */
    setManualSteps: (steps: number | null) => void;
    /** Toggle manual mode on/off */
    setIsManualMode: (enabled: boolean) => void;
}

const DebugStepsContext = createContext<DebugStepsContextType | undefined>(undefined);

export function DebugStepsProvider({ children }: { children: ReactNode }) {
    const [manualSteps, setManualSteps] = useState<number | null>(null);
    const [isManualMode, setIsManualMode] = useState<boolean>(false);

    return (
        <DebugStepsContext.Provider 
            value={{ 
                manualSteps, 
                isManualMode, 
                setManualSteps, 
                setIsManualMode 
            }}
        >
            {children}
        </DebugStepsContext.Provider>
    );
}

export function useDebugSteps() {
    const context = useContext(DebugStepsContext);
    if (!context) {
        throw new Error('useDebugSteps must be used within a DebugStepsProvider');
    }
    return context;
}
