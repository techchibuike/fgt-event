import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePhase } from '../context/PhaseContext';

interface FormData {
    full_name: string;
    stage_name: string;
    email: string;
    phone: string;
    talent_category: string;
    bio: string;
    photo_url: string;
    video_url: string;
    state_of_origin: string;
    department: string;
    social_media: {
        instagram: string;
        twitter: string;
        facebook: string;
    };
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { loading: phaseLoading } = usePhase();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        stage_name: '',
        email: '',
        phone: '',
        talent_category: 'Singing',
        bio: '',
        photo_url: '',
        video_url: '',
        state_of_origin: '',
        department: '',
        social_media: {
            instagram: '',
            twitter: '',
            facebook: ''
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.') as [keyof FormData, string];
            setFormData(prev => ({
                ...prev,
                [parent]: { ...(prev[parent] as object), [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name as keyof FormData]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/contestants/register', formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (phaseLoading) return null;

    if (success) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md w-full glass-pill py-12 px-8 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <h2 className="text-3xl font-oswald font-bold uppercase text-white">Application Received</h2>
                    <p className="text-white/60">Your journey to the crown begins now. We'll review your audition and contact you via email soon.</p>
                    <span className="text-gold-500 text-xs font-bold animate-pulse">Redirecting to Homepage...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />
            <div className="pt-48 pb-32 px-6">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Info Column */}
                    <div className="space-y-12">
                        <div className="mb-12">
                            <span className="flex items-center gap-4 text-gold-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">
                                <span className="w-12 h-px bg-gold-500"></span>
                                FUTO'S GOT TALENT
                            </span>
                            <h1 className="text-7xl md:text-9xl font-black font-oswald uppercase leading-[0.8] tracking-tighter">
                                FORGE <br /> YOUR <span className="text-gold-500">LEGACY.</span>
                            </h1>
                        </div>

                        <div className="p-12 border border-white/5 bg-white/1 flex flex-col gap-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[100px] rounded-full group-hover:bg-gold-500/20 transition-all"></div>
                            <h3 className="text-2xl font-bold font-oswald uppercase italic">Requirements</h3>
                            <ul className="space-y-6">
                                {[
                                    "Valid FUTO Student ID Card.",
                                    "A high-quality 2-minute talent video.",
                                    "A professional headshot (Studio Recommended).",
                                    "Active social media presence.",
                                    "Passion, grit, and the Titan spirit."
                                ].map((req, i) => (
                                    <li key={i} className="flex gap-4 items-start text-white/50 text-sm italic">
                                        <span className="text-gold-500 font-bold">0{i + 1}</span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="relative">
                        <form onSubmit={handleSubmit} className="space-y-10 group">
                            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">{error}</div>}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Full Name</label>
                                    <input name="full_name" required value={formData.full_name} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="Johnathan Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Stage Name</label>
                                    <input name="stage_name" required value={formData.stage_name} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="MC Titan" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Email Address</label>
                                    <input name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="john@student.futo.edu.ng" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Phone Number</label>
                                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="+234 ..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">State of Origin</label>
                                    <input name="state_of_origin" required value={formData.state_of_origin} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="e.g. Imo" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Department</label>
                                    <input name="department" required value={formData.department} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="e.g. Computer Science" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2 relative">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Talent Category</label>
                                    <select name="talent_category" value={formData.talent_category} onChange={handleChange} className="bg-neutral-900 border border-white/10 p-4 focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer text-sm">
                                        {['Singing', 'Dancing', 'Comedy', 'Magic', 'Acrobatics', 'Poetry', 'Instrumental', 'Rap', 'Other'].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Video Audition Link</label>
                                    <input name="video_url" required value={formData.video_url} onChange={handleChange} className="bg-transparent border-b border-white/10 py-4 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="Drive/YouTube link..." />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Bio (Max 200 Words)</label>
                                <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="bg-transparent border border-white/10 p-6 focus:border-gold-500 outline-none transition-all placeholder:text-white/5" placeholder="Tell us about your journey..."></textarea>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Social Presence</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input name="social_media.instagram" value={formData.social_media.instagram} onChange={handleChange} className="bg-white/5 p-4 rounded-lg focus:ring-1 ring-gold-500 outline-none text-xs" placeholder="Instagram ID" />
                                    <input name="social_media.twitter" value={formData.social_media.twitter} onChange={handleChange} className="bg-white/5 p-4 rounded-lg focus:ring-1 ring-gold-500 outline-none text-xs" placeholder="Twitter ID" />
                                    <input name="social_media.facebook" value={formData.social_media.facebook} onChange={handleChange} className="bg-white/5 p-4 rounded-lg focus:ring-1 ring-gold-500 outline-none text-xs" placeholder="Facebook Profile" />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className={`w-full py-8 text-black font-black uppercase tracking-[0.5em] text-sm flex items-center justify-center gap-4 transition-all ${loading ? 'bg-neutral-800' : 'gold-bg-gradient active:scale-[0.98]'}`}
                            >
                                {loading ? "SUBMITTING..." : "ENTER THE TITAN"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
