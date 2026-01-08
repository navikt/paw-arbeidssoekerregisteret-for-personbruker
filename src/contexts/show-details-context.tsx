'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ShowDetailsContextType = {
    showDetails: boolean;
    setShowDetails: (show: boolean) => void;
};

const ShowDetailsContext = createContext<ShowDetailsContextType | undefined>(undefined);

export function ShowDetailsProvider({ children }: { children: ReactNode }) {
    const [showDetails, setShowDetails] = useState(true);

    return (
        <ShowDetailsContext.Provider value={{ showDetails, setShowDetails }}>{children}</ShowDetailsContext.Provider>
    );
}

export function useShowDetails() {
    const context = useContext(ShowDetailsContext);
    if (context === undefined) {
        throw new Error('useShowDetails must be used within a ShowDetailsProvider');
    }
    return context;
}
