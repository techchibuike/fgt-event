import React from 'react';
import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ: React.FC = () => {
    const { loading } = usePhase();

    const faqs = [
        { q: "Who can participate?", a: "The competition is strictly open to all current undergraduate students of the Federal University of Technology, Owerri (FUTO), across all departments and levels." },
        { q: "How are the winners selected?", a: "Selection is based on a weighted 50/50 split between professional judges' scores (talent, stage presence, impact) and public voting (popularity and reach)." },
        { q: "Is there a registration fee?", a: "No. Registration for Season 2.0 is completely free for all eligible students during the initial sign-up phase." },
        { q: "What should my audition video contain?", a: "Your audition video must be no longer than 60 seconds. It should clearly show your face and demonstrate your core talent without background noise or distractions." },
        { q: "Can I register as a group?", a: "Yes, group registrations are allowed. However, the group leader must be the one to fill the form with the group's stage name." },
        { q: "When does voting begin?", a: "Voting will commence in Phase 4, after the initial screening and auditing rounds are concluded." }
    ];

    if (loading) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1000px] mx-auto">
                <div className="flex flex-col items-start gap-2 mb-20">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                        <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">04</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">NEED HELP?</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9]">
                        FREQUENT QUESTIONS
                    </h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((item, i) => (
                        <details key={i} className="group border border-white/5 rounded-2xl bg-neutral-900/30 overflow-hidden hover:border-gold-500/20 transition-colors">
                            <summary className="p-8 cursor-pointer list-none flex justify-between items-center group-open:bg-white/5 transition-colors">
                                <span className="font-bold text-xl text-white/80 uppercase tracking-tight">{item.q}</span>
                                <span className="text-gold-500 text-3xl font-light group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <div className="px-8 pb-8 text-white/50 text-lg leading-relaxed border-t border-white/5 pt-6">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FAQ;
