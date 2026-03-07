import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Contestant {
    id: number;
    full_name: string;
    stage_name: string;
    email: string;
    talent_category: string;
    department: string;
    video_url: string;
    status: string;
    created_at: string;
}

const ContestantTable: React.FC<{ refetch: () => void }> = ({ refetch }) => {
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContestants = async () => {
        try {
            const response = await api.get('/contestants/admin/all');
            setContestants(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch');
        }
    };

    useEffect(() => {
        fetchContestants();
    }, []);

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.patch(`/contestants/${id}/status`, { status });
            fetchContestants();
            refetch();
        } catch (err) {
            alert('Selection update failed');
        }
    };

    if (loading) return null;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <h3 className="text-2xl font-oswald font-black uppercase tracking-tight italic">Applicant Screening</h3>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{contestants.length} Entries found</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
                            <th className="px-6 pb-2">Entry</th>
                            <th className="px-6 pb-2">Talent Pool</th>
                            <th className="px-6 pb-2">FUTO Department</th>
                            <th className="px-6 pb-2">Audition</th>
                            <th className="px-6 pb-2">Status</th>
                            <th className="px-6 pb-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestants.map((c) => (
                            <tr key={c.id} className="glass-pill border border-white/5 group hover:bg-white/5 transition-all">
                                <td className="px-6 py-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-lg text-white group-hover:text-gold-400 transition-colors uppercase tracking-tight">{c.stage_name}</span>
                                        <span className="text-[10px] text-white/30 font-mono italic">{c.full_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-8">
                                    <span className="text-xs font-black uppercase tracking-widest text-gold-500/80">{c.talent_category}</span>
                                </td>
                                <td className="px-6 py-8">
                                    <span className="text-xs text-white/50 italic">{c.department || 'N/A'}</span>
                                </td>
                                <td className="px-6 py-8">
                                    {c.video_url ? (
                                        <a href={c.video_url} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 hover:text-cyan-400 border-b border-cyan-500/20">
                                            View Audition
                                        </a>
                                    ) : (
                                        <span className="text-[10px] text-white/10 italic uppercase">No Link</span>
                                    )}
                                </td>
                                <td className="px-6 py-8">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${c.status === 'Qualified' ? 'bg-emerald-500/10 text-emerald-500' :
                                            c.status === 'Pending' ? 'bg-gold-500/10 text-gold-500' :
                                                'bg-red-500/10 text-red-500'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-8 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {c.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(c.id, 'Qualified')}
                                                    className="p-3 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-500 hover:text-black rounded-lg transition-all"
                                                    title="Qualify"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(c.id, 'Eliminated')}
                                                    className="p-3 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-black rounded-lg transition-all"
                                                    title="Reject"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestantTable;
