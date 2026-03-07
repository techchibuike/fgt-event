import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export interface PhaseInfo {
    title: string;
    cta: string;
    sub: string;
    nav: string[];
    sections: string[];
}

interface PhaseContextType {
    phase: number;
    phaseData: Record<number, PhaseInfo>;
    current: PhaseInfo;
    loading: boolean;
    setPhase: (phase: number) => void;
}

export const defaultPhaseData: Record<number, PhaseInfo> = {
    1: {
        title: "FUTO'S GOT TALENT",
        cta: "Register Now",
        sub: "Public Signups Open",
        nav: ['About', 'Prizes', 'Categories', 'FAQ', 'Sponsors'],
        sections: ['Hero', 'Marquee', 'About', 'Prizes', 'Categories', 'FAQ', 'Sponsors', 'Footer']
    },
    2: {
        title: "SCREENING",
        cta: "Review in Progress",
        sub: "Private Selection Round",
        nav: ['About', 'Gallery', 'Sponsors'],
        sections: ['Hero', 'Marquee', 'SponsorsOnly', 'Footer']
    },
    3: {
        title: "THE SHOWCASE",
        cta: "View Talent",
        sub: "Audition Round 1",
        nav: ['About', 'Contestants', 'Gallery', 'Sponsors'],
        sections: ['Hero', 'Marquee', 'Showcase', 'Footer']
    },
    4: {
        title: "VOTE NOW",
        cta: "Cast Your Vote",
        sub: "Qualified Voting Active",
        nav: ['Leaderboard', 'Vote', 'Rules'],
        sections: ['Hero', 'Marquee', 'Leaderboard', 'Showcase', 'Footer']
    },
    5: {
        title: "ROUND 2",
        cta: "Next Auditioning",
        sub: "Scores & Votes",
        nav: ['About', 'Scores', 'Leaderboard'],
        sections: ['Hero', 'Marquee', 'Leaderboard', 'Showcase', 'Footer']
    },
    6: {
        title: "THE FINALISTS",
        cta: "Get Tickets",
        sub: "Referral Link Active",
        nav: ['Finalists', 'Tickets', 'Venue'],
        sections: ['Hero', 'Marquee', 'Finalists', 'Tickets', 'Footer']
    },
    7: {
        title: "GRAND FINALE",
        cta: "Join Live",
        sub: "The Great Coronation",
        nav: ['Venue', 'Tickets', 'Stream'],
        sections: ['Hero', 'Marquee', 'LiveStream', 'Leaderboard', 'Footer']
    },
    8: {
        title: "HALL OF FAME",
        cta: "Past Winners",
        sub: "Season Recap",
        nav: ['Winners', 'Gallery', 'Records'],
        sections: ['Hero', 'Marquee', 'HallOfFame', 'Footer']
    }
};

const PhaseContext = createContext<PhaseContextType | undefined>(undefined);

export const PhaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [phase, setPhaseState] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPhase = async () => {
        try {
            const response = await api.get('/settings/phase');
            // setPhaseState(response.data.phase);
            // User override for testing: setPhaseState(2);
            setPhaseState(response.data.phase || 1);
        } catch (err) {
            console.error('Failed to fetch event phase:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhase();
    }, []);

    const current = defaultPhaseData[phase] || defaultPhaseData[1];

    return (
        <PhaseContext.Provider value={{
            phase,
            phaseData: defaultPhaseData,
            current,
            loading,
            setPhase: setPhaseState
        }}>
            {children}
        </PhaseContext.Provider>
    );
};

export const usePhase = () => {
    const context = useContext(PhaseContext);
    if (context === undefined) {
        throw new Error('usePhase must be used within a PhaseProvider');
    }
    return context;
};
