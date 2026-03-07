import React from 'react';
import { usePhase } from '../context/PhaseContext';

interface ContestantCardProps {
    contestant: {
        id: number;
        stage_name: string;
        talent_category: string;
        photo_url: string;
        total_votes: number;
    };
    onVoteClick: (contestant: any) => void;
}

const ContestantCard: React.FC<ContestantCardProps> = ({ contestant, onVoteClick }) => {
    const { phase } = usePhase();

    // Voting is only allowed in Phase 4 (Voting) and Phase 5 (Round 2)
    const isVotingActive = phase === 4 || phase === 5;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/50 transition-all duration-500">
            {/* Image Container */}
            <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-900">
                {contestant.photo_url ? (
                    <img
                        src={contestant.photo_url}
                        alt={contestant.stage_name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <span className="text-[10px] mt-4 uppercase tracking-widest font-mono">No Photo Provided</span>
                    </div>
                )}

                {/* Voting Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
            </div>

            {/* Content Details */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500">
                    {contestant.talent_category}
                </span>

                <h3 className="text-2xl font-oswald font-black uppercase tracking-tight text-white line-clamp-1">
                    {contestant.stage_name}
                </h3>

                <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Total Votes</span>
                        <span className="text-xl font-mono font-bold text-white">{contestant.total_votes.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => onVoteClick(contestant)}
                        disabled={!isVotingActive}
                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2
                            ${isVotingActive
                                ? 'bg-gold-500 hover:bg-gold-400 text-black shadow-[0_0_15px_rgba(255,215,0,0.3)] active:scale-95'
                                : 'bg-white/10 text-white/30 cursor-not-allowed'
                            }
                        `}
                    >
                        {isVotingActive ? 'CAST VOTE' : 'VOTING CLOSED'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContestantCard;
