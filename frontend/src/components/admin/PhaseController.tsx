import React, { useState } from 'react';
import { api } from '../../services/api';
import { defaultPhaseData } from '../../context/PhaseContext';

interface PhaseControllerProps {
    currentPhasePhase: number;
    onPhaseChange: () => void;
}

const PhaseController: React.FC<PhaseControllerProps> = ({ currentPhasePhase, onPhaseChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePhaseUpdate = async (newPhase: number) => {
        if (!window.confirm(`Are you sure you want to activate Phase ${newPhase}? This will immediately update the public website.`)) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Also enable voting automatically if phase is 4 or 5
            const votingActive = (newPhase === 4 || newPhase === 5);

            await api.patch('/settings/phase', {
                phase: newPhase,
                voting_active: votingActive
            });

            onPhaseChange();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to update phase');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-pill p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[80px] rounded-full"></div>

            <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-oswald font-black uppercase tracking-tight italic">Event Timeline Command</h3>
                    <p className="text-white/40 text-sm mt-1">Select a phase to instantly update the public-facing application state.</p>
                </div>
                {error && <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</span>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
                {Object.entries(defaultPhaseData).map(([phaseNum, phaseData]: [string, any]) => {
                    const num = parseInt(phaseNum);
                    const isActive = currentPhasePhase === num;
                    const isPast = num < currentPhasePhase;

                    return (
                        <button
                            key={num}
                            onClick={() => handlePhaseUpdate(num)}
                            disabled={loading}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2
                                ${isActive
                                    ? 'bg-gold-500/20 border-gold-500 text-gold-500 shadow-[0_0_20px_rgba(255,215,0,0.15)] ring-1 ring-gold-500/50'
                                    : isPast
                                        ? 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                                        : 'bg-transparent border-white/5 text-white/20 hover:border-white/20'}
                                ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 cursor-pointer'}
                            `}
                        >
                            <span className={`text-2xl font-black ${isActive ? 'text-gold-500' : 'text-white/20'}`}>0{num}</span>
                            <span className="text-[9px] uppercase tracking-widest font-black leading-tight h-8 flex items-center">{phaseData.title}</span>
                            {isActive && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 rounded-full animate-ping opacity-75"></span>
                            )}
                            {isActive && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PhaseController;
