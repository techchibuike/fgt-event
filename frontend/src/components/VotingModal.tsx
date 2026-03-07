import React, { useState } from 'react';
import { api } from '../services/api';

interface VotingModalProps {
    contestant: any;
    onClose: () => void;
}

const VotingModal: React.FC<VotingModalProps> = ({ contestant, onClose }) => {
    const [voteQuantity, setVoteQuantity] = useState<number>(1);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const VOTE_COST = 100; // NGN

    const handleVoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/payments/vote/initialize', {
                contestant_id: contestant.id,
                contestant_name: contestant.stage_name,
                vote_quantity: voteQuantity,
                voter_email: email
            });

            // Redirect to Paystack Checkout URL
            if (response.data?.authorization_url) {
                window.location.href = response.data.authorization_url;
            } else {
                throw new Error("Invalid payment gateway response");
            }

        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to initialize payment gateway.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Box */}
            <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-oswald font-black uppercase tracking-tighter italic">
                        Vote for <span className="text-gold-500">{contestant.stage_name}</span>
                    </h3>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleVoteSubmit} className="p-6 space-y-6">
                    {/* Visual Reciept */}
                    <div className="bg-black/50 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Total Cost</span>
                            <span className="text-2xl font-mono text-white">₦ {(voteQuantity * VOTE_COST).toLocaleString()}</span>
                        </div>
                        <div className="text-right flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest text-gold-500">Rate</span>
                            <span className="text-sm font-mono text-white/50">₦{VOTE_COST} / Vote</span>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Number of Votes</label>
                            <input
                                type="number"
                                min="1"
                                max="1000"
                                required
                                value={voteQuantity}
                                onChange={(e) => setVoteQuantity(parseInt(e.target.value) || 1)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold-500/50 outline-none transition-all text-white font-mono text-lg"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Email Receipt To</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold-500/50 outline-none transition-all text-white"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <p className="text-[9px] text-white/30 text-center uppercase tracking-widest leading-relaxed">
                        By proceeding, you will be redirected to Paystack to complete your secure payment.
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-xl text-black font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all ${loading ? 'bg-neutral-800 text-white/20' : 'bg-gold-500 hover:bg-gold-400 active:scale-95'}`}
                    >
                        {loading ? 'INITIALIZING PAYMENT...' : 'PROCEED TO PAYMENT'}
                        {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VotingModal;
