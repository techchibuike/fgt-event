import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import ContestantTable from '../../components/admin/ContestantTable';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        qualified: 0
    });
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api.get('/contestants/admin/all');
            const contestants = response.data;
            setStats({
                total: contestants.length,
                pending: contestants.filter((c: any) => c.status === 'Pending').length,
                qualified: contestants.filter((c: any) => c.status === 'Qualified').length
            });
            setLoading(false);
        } catch (err) {
            // Unauthorised or session expired
            navigate('/admin/login');
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout failed');
            navigate('/admin/login');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Admin Header */}
            <div className="border-b border-white/5 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <span className="text-xl font-oswald font-black uppercase italic tracking-tighter">
                            FGT <span className="text-gold-500">ADMIN</span>
                        </span>
                        <div className="h-6 w-px bg-white/10 hidden md:block"></div>
                        <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                            <span className="text-gold-500 border-b border-gold-500 pb-1">Contestants</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Voting</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Tickets</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Settings</span>
                        </nav>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors"
                    >
                        Termiante Session
                    </button>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto p-8 space-y-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: 'Total Applicants', value: stats.total, color: 'text-white' },
                        { label: 'Awaiting Screening', value: stats.pending, color: 'text-gold-500' },
                        { label: 'Qualified Pool', value: stats.qualified, color: 'text-emerald-500' }
                    ].map((stat, i) => (
                        <div key={i} className="glass-pill p-10 border border-white/5 flex flex-col gap-2 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/1 blur-[60px] group-hover:bg-gold-500/5 transition-all"></div>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">{stat.label}</span>
                            <span className={`text-6xl font-oswald font-black ${stat.color}`}>{stat.value}</span>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <ContestantTable refetch={checkAuth} />
            </main>
        </div>
    );
};

export default Dashboard;
