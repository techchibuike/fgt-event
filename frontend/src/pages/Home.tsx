import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

// Shared Components
interface SectionHeaderProps {
    number: string;
    title: string;
    subtitle: string;
    align?: 'left' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle, align = 'left' }) => (
    <div className={`flex flex-col md:flex-row ${align === 'right' ? 'md:flex-row-reverse' : ''} md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8`}>
        <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} gap-2`}>
            <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-gold-500"></span>
                <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">{number}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{subtitle}</span>
            </div>
            <h2 className={`text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9] ${align === 'right' ? 'text-right' : ''}`}>
                {title}
            </h2>
        </div>
    </div>
);

interface PhaseInfo {
    title: string;
    cta: string;
    sub: string;
    nav: string[];
    sections: string[];
}

const Home: React.FC = () => {
    const [phase, setPhase] = useState<number>(1); // Default to Phase 1 (Registration)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPhase = async () => {
            try {
                const response = await api.get('/settings/phase');
                setPhase(response.data.phase);
            } catch (err) {
                console.error('Failed to fetch event phase:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPhase();
    }, []);

    // Phase Display Data
    const phaseData: Record<number, PhaseInfo> = {
        1: {
            title: "FUTO GOT TALENT",
            cta: "Register Now",
            sub: "Public Signups Open",
            nav: ['About', 'Prizes', 'Categories', 'Sponsors'],
            sections: ['Hero', 'Marquee', 'Prizes', 'Categories', 'Footer']
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
            sub: "Titan Coronation",
            nav: ['Venue', 'Tickets', 'Stream'],
            sections: ['Hero', 'Marquee', 'LiveStream', 'Leaderboard', 'Footer']
        },
        8: {
            title: "HALL OF FAME",
            cta: "Past Winners",
            sub: "Season Recap",
            nav: ['Winners', 'Records', 'Highlights'],
            sections: ['Hero', 'Marquee', 'Winners', 'Footer']
        }
    };

    const current = phaseData[phase] || phaseData[1];

    if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center"><div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center w-full px-6 pointer-events-none">
                <div className="w-full max-w-[1400px] flex items-center justify-between pointer-events-auto mx-auto md:px-12">
                    {/* Logo */}
                    <div className="flex flex-col group cursor-pointer">
                        <span className="text-white font-bold text-2xl tracking-tighter leading-none group-hover:text-gold-400 transition-colors uppercase">
                            FGT<span className="text-gold-500">.</span>
                        </span>
                        <span className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase mt-1">
                            FUTO GOT TALENT
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center glass-pill px-8 py-3 gap-8">
                            {current.nav.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-gold-400 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={() => window.location.href = '/register'}
                            className="gold-bg-gradient px-8 py-3.5 rounded-full flex items-center gap-3 shadow-xl shadow-gold-900/10 group overflow-hidden relative active:scale-95 transition-transform"
                        >
                            <span className="text-xs font-black uppercase tracking-widest text-black relative z-10">{current.cta}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover:translate-x-1 transition-transform relative z-10">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden flex items-end justify-center pb-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-neutral-950/40 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10"></div>
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070')] bg-cover bg-center grayscale contrast-125 opacity-30 animate-[pulse_10s_infinite]"></div>
                </div>

                <div className="relative z-20 text-center max-w-4xl px-4 animate-[fadeIn_1.5s_ease-out]">
                    <div className="mb-8">
                        <span className="px-4 py-1.5 glass-pill text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 border-gold-900/30">
                            Season 2.0 • The Ultimate Prize Awaits
                        </span>
                    </div>

                    <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold font-oswald text-white tracking-tighter uppercase mb-6 drop-shadow-2xl">
                        <span className="block italic text-outline">FUTO GOT</span>
                        <span className="block text-gold-500 mt-2">{current.title === "FUTO GOT TALENT" ? "TALENT" : current.title}</span>
                    </h1>

                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                        {phase === 1 ? "Where creativity and talent meet. Owerri's biggest stage is back for 2026. Forge your legacy and compete for the crown." : `Currently in Stage ${phase}: ${current.sub}. Success is a blend of talent, strategy, and public support.`}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold font-oswald text-white tracking-tight">{phase < 7 ? "COMING" : "LIVE"}</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{phase < 7 ? "SOON" : "STADIUM"}</span>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold font-oswald text-white tracking-tight">FUTO</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">OWERRI</span>
                    </div>
                </div>
            </header>

            {/* Marquee */}
            {current.sections.includes('Marquee') && (
                <div className="border-y border-white/5 bg-neutral-900 py-6 overflow-hidden">
                    <div className="animate-marquee inline-flex whitespace-nowrap">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span className="text-4xl font-oswald font-black uppercase italic text-white/20 tracking-tighter">UNLEASH CREATIVITY</span>
                                <span className="text-4xl text-gold-500 opacity-30">★</span>
                                <span className="text-4xl font-oswald font-black uppercase italic text-white/20 tracking-tighter">THE TITAN ASCENDS</span>
                                <span className="text-4xl text-gold-500 opacity-30">★</span>
                                <span className="text-4xl font-oswald font-black uppercase italic text-white/20 tracking-tighter">WIN 200K CASH</span>
                                <span className="text-4xl text-gold-500 opacity-30">★</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Prize Pool Section */}
            {current.sections.includes('Prizes') && (
                <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" id="prizes">
                    <SectionHeader
                        number="01"
                        title="THE GRAND PRIZES"
                        subtitle="STAKES ARE HIGH"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Winner */}
                        <div className="relative h-[500px] group overflow-hidden border border-gold-500/20 active:scale-[0.98] transition-all">
                            <div className="absolute inset-0 bg-gold-950/20 group-hover:bg-gold-950/40 transition-colors z-10"></div>
                            <div className="absolute top-8 left-8 z-20">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">GRAND PRIZE</span>
                            </div>
                            <div className="absolute bottom-12 left-8 z-20">
                                <h3 className="text-7xl font-black font-oswald text-white tracking-tighter leading-none mb-4">200K</h3>
                                <p className="text-sm text-white/60 uppercase tracking-widest font-bold">+ RECORDING DEAL & AWARD</p>
                            </div>
                        </div>

                        {/* 2nd Place */}
                        <div className="relative h-[500px] group overflow-hidden border border-white/10 bg-neutral-900/50 active:scale-[0.98] transition-all">
                            <div className="absolute top-8 left-8 z-20">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">RUNNER UP</span>
                            </div>
                            <div className="absolute bottom-12 left-8 z-20">
                                <h3 className="text-7xl font-black font-oswald text-white tracking-tighter leading-none mb-4">100K</h3>
                                <p className="text-sm text-white/60 uppercase tracking-widest font-bold">+ MEDIA FEATURE</p>
                            </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="relative h-[500px] group overflow-hidden border border-white/10 active:scale-[0.98] transition-all">
                            <div className="absolute top-8 left-8 z-20">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">3RD PLACE</span>
                            </div>
                            <div className="absolute bottom-12 left-8 z-20">
                                <h3 className="text-7xl font-black font-oswald text-white tracking-tighter leading-none mb-4">50K</h3>
                                <p className="text-sm text-white/60 uppercase tracking-widest font-bold">+ BRAND PACKAGE</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Grid */}
            {current.sections.includes('Categories') && (
                <section className="py-32 bg-neutral-950 border-t border-white/5" id="categories">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                        <SectionHeader
                            number="02"
                            title="OPEN CATEGORIES"
                            subtitle="WHATS YOUR TALENT?"
                            align="right"
                        />

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                            {['Singing', 'Dancing', 'Comedy', 'Magic', 'Acrobatics', 'Poetry', 'Instrumental', 'Rap'].map((cat, i) => (
                                <div key={i} className="bg-neutral-950 p-12 hover:bg-neutral-900 transition-colors group cursor-default">
                                    <span className="block text-[10px] font-black text-gold-500/50 uppercase tracking-[0.3em] mb-4">0{i + 1}</span>
                                    <h4 className="text-2xl font-bold uppercase tracking-tighter text-white group-hover:text-gold-400 transition-colors italic">{cat}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Future Section Placeholders */}
            {current.sections.includes('Showcase') && (
                <section className="py-32 text-center border-t border-white/5 bg-neutral-950" id="contestants">
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeader number="03" title="THE SHOWCASE" subtitle="TALENT GALLERY" />
                        <div className="p-24 border border-white/5 bg-white/1 rounded-3xl">
                            <p className="text-white/40 uppercase tracking-widest font-bold italic">Gallery loading... Meeting the titans soon.</p>
                        </div>
                    </div>
                </section>
            )}

            {current.sections.includes('Leaderboard') && (
                <section className="py-32 text-center border-t border-white/5 bg-neutral-900/30" id="leaderboard">
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeader number="04" title="LIVE BOARD" subtitle="REAL-TIME VOTING" align="right" />
                        <div className="p-24 border border-gold-500/20 bg-gold-500/5 rounded-3xl">
                            <p className="text-gold-500/40 uppercase tracking-widest font-bold italic">Syncing with Supabase... Real-time ranks incoming.</p>
                        </div>
                    </div>
                </section>
            )}

            {current.sections.includes('Tickets') && (
                <section className="py-32 text-center border-t border-white/5 bg-neutral-950" id="tickets">
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeader number="05" title="GET TICKETS" subtitle="THE FINALS" />
                        <div className="p-24 border border-white/5 bg-white/1 rounded-3xl">
                            <p className="text-white/40 uppercase tracking-widest font-bold italic">Ticketing engine warming up... Secure your seat soon.</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-black py-24 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24">
                        <div>
                            <h2 className="text-7xl md:text-9xl font-black font-oswald tracking-tighter uppercase text-white mb-12">
                                FORGE YOUR <br className="hidden md:block" /> LEGACY<span className="text-gold-500">.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <span className="text-[10px] font-black uppercase tracking-[.3em] text-white/30">CONTACT</span>
                                <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest">
                                    FUTO Student Center <br /> Owerri, Nigeria
                                </p>
                                <p className="text-sm font-bold text-gold-500">hello@next-gentitan.com</p>
                            </div>
                            <div className="space-y-6">
                                <span className="text-[10px] font-black uppercase tracking-[.3em] text-white/30">SYSTEM</span>
                                <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest">
                                    Version 2.0 Live <br /> Protocol: Secure Voting
                                </p>
                                <p className="text-xs text-white/20">© 2026 FGT ENT.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
