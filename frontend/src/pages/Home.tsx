import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    const { phase, current, loading } = usePhase();

    if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center"><div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            <Navbar />

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
                        <span className="block italic text-outline opacity-80 decoration-gold-500/30">FUTO'S GOT</span>
                        <span className="block text-gold-500 mt-2 lowercase first-letter:uppercase">{current.title === "FUTO'S GOT TALENT" ? "TALENT" : current.title}</span>
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
                                <span className="text-4xl font-oswald font-black uppercase italic text-white/20 tracking-tighter">THE STARS ALIGN</span>
                                <span className="text-4xl text-gold-500 opacity-30">★</span>
                                <span className="text-4xl font-oswald font-black uppercase italic text-white/20 tracking-tighter">WIN 200K CASH</span>
                                <span className="text-4xl text-gold-500 opacity-30">★</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* About Section */}
            {current.sections.includes('About') && (
                <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" id="about">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="aspect-square bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070"
                                    alt="Event"
                                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold-600/10 blur-[100px] -z-10"></div>
                        </div>
                        <div>
                            <SectionHeader
                                number="01"
                                title="THE VISION"
                                subtitle="BEYOND THE STAGE"
                            />
                            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
                                FUTO'S GOT TALENT is more than just a competition; it's a movement. We provide the most prestigious platform for students to showcase their extraordinary abilities to a global audience.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-gold-500 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-1">Exposure</h4>
                                        <p className="text-sm text-white/50">Get noticed by industry scouts and millions of viewers online.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-gold-500 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-1">Empowerment</h4>
                                        <p className="text-sm text-white/50">Win substantial funding to launch your professional career.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Prize Pool Section */}
            {current.sections.includes('Prizes') && (
                <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" id="prizes">
                    <SectionHeader
                        number="02"
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
                            number="03"
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

            {/* FAQ Section */}
            {current.sections.includes('FAQ') && (
                <section className="py-32 bg-neutral-900/20" id="faq">
                    <div className="max-w-[1000px] mx-auto px-6">
                        <SectionHeader
                            number="04"
                            title="FREQUENT QUESTIONS"
                            subtitle="NEED HELP?"
                        />
                        <div className="space-y-4">
                            {[
                                { q: "Who can participate?", a: "Current undergraduate students of FUTO across all departments and levels." },
                                { q: "How are the winners selected?", a: "A combination of professional judges' scores and public voting weighted equally." },
                                { q: "Is there a registration fee?", a: "Phase 1 registration is free for all students." },
                                { q: "What should my audition video contain?", a: "A 60-second clear video highlighting your core talent. No background noise." }
                            ].map((item, i) => (
                                <details key={i} className="group border border-white/5 rounded-xl bg-neutral-950 overflow-hidden">
                                    <summary className="p-6 cursor-pointer list-none flex justify-between items-center group-open:bg-white/5 transition-colors text-left">
                                        <span className="font-bold text-lg text-white/80 uppercase tracking-tight">{item.q}</span>
                                        <span className="text-gold-500 text-2xl group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <div className="p-6 text-white/60 leading-relaxed border-t border-white/5 text-left">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Sponsors Section */}
            {current.sections.includes('Sponsors') && (
                <section className="py-32 border-t border-white/5" id="sponsors">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                        <div className="flex flex-col items-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-500 mb-4">PARTNERS & BACKERS</span>
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white font-oswald">GLOBAL SPONSORS</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 hover:opacity-100 transition-opacity">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                                    <span className="text-white/20 font-black italic tracking-tighter uppercase text-xl">SPONSOR {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Future Section Placeholders */}
            {current.sections.includes('Showcase') && (
                <section className="py-32 text-center border-t border-white/5 bg-neutral-950" id="gallery">
                    <div className="max-w-4xl mx-auto px-6" id="contestants">
                        <SectionHeader number="05" title="THE SHOWCASE" subtitle="TALENT GALLERY" />
                        <div className="p-24 border border-white/5 bg-white/1 rounded-3xl">
                            <p className="text-white/40 uppercase tracking-widest font-bold italic">Gallery loading... Meeting the stars soon.</p>
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
            <Footer />
        </div>
    );
};

export default Home;
