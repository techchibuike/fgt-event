import React from 'react';
import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Categories: React.FC = () => {
    const { loading } = usePhase();

    const categories = [
        { name: 'Singing', desc: 'Vocal performances, solo or group.' },
        { name: 'Dancing', desc: 'Choreographed movements across all styles.' },
        { name: 'Comedy', desc: 'Stand-up, skits, and humorous storytelling.' },
        { name: 'Magic', desc: 'Illusions and sleight of hand.' },
        { name: 'Acrobatics', desc: 'Gymnastic feats and physical skill.' },
        { name: 'Poetry', desc: 'Spoken word and powerful rhythmic verse.' },
        { name: 'Instrumental', desc: 'Musical mastery across all instruments.' },
        { name: 'Rap', desc: 'Flow, lyricism, and rhythmic bars.' }
    ];

    if (loading) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center text-center gap-2 mb-24">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                        <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">03</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">WHATS YOUR TALENT?</span>
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                    </div>
                    <h2 className="text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9]">
                        OPEN CATEGORIES
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-neutral-950 p-16 hover:bg-neutral-900 transition-all group cursor-default h-80 flex flex-col justify-center border border-transparent hover:border-gold-500/20">
                            <span className="block text-[12px] font-black text-gold-500/50 uppercase tracking-[0.4em] mb-6">0{i + 1}</span>
                            <h4 className="text-3xl font-bold uppercase tracking-tighter text-white group-hover:text-gold-400 transition-colors italic mb-4">{cat.name}</h4>
                            <p className="text-white/40 text-sm leading-relaxed translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Categories;
