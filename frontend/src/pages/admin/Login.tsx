import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { username, password });
            if (response.data) {
                // Success - redirect to dashboard
                // The cookie is handled automatically by the browser
                navigate('/admin/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950">
            <div className="max-w-md w-full">
                <div className="text-center mb-12">
                    <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block animate-pulse">Secure Admin Access</span>
                    <h1 className="text-4xl font-oswald font-black uppercase tracking-tighter text-white">Admin Portal</h1>
                </div>

                <div className="glass-pill p-10 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[80px] rounded-full"></div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 p-4 rounded-xl focus:border-gold-500/50 outline-none transition-all text-white placeholder:text-white/10"
                                placeholder="Admin ID"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">Keyphrase</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 p-4 rounded-xl focus:border-gold-500/50 outline-none transition-all text-white placeholder:text-white/10"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all ${loading ? 'bg-neutral-800 text-white/20' : 'gold-bg-gradient text-black active:scale-[0.98]'}`}
                        >
                            {loading ? "AUTHENTICATING..." : "GRANT ACCESS"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-white/10 text-[10px] font-mono tracking-widest uppercase italic">
                    Authorized Personnel Only — Session Monitored
                </p>
            </div>
        </div>
    );
};

export default Login;
