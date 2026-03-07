import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Prizes: React.FC = () => {
    const { loading } = usePhase();

    if (loading) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="flex flex-col items-start gap-2 mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                        <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">02</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">STAKES ARE HIGH</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9]">
                        THE GRAND PRIZES
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Winner */}
                    <div className="relative h-[600px] group overflow-hidden border border-gold-500/20 bg-neutral-900/50 rounded-2xl transition-all hover:border-gold-500/50">
                        <div className="absolute inset-0 bg-gold-950/10 group-hover:bg-gold-950/20 transition-colors z-10"></div>
                        <div className="absolute top-10 left-10 z-20">
                            <span className="px-4 py-2 bg-gold-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">GRAND PRIZE</span>
                        </div>
                        <div className="absolute bottom-12 left-10 z-20">
                            <h3 className="text-8xl font-black font-oswald text-white tracking-tighter leading-none mb-4">200K</h3>
                            <p className="text-lg text-gold-400 uppercase tracking-widest font-bold mb-2">CASH PRIZE</p>
                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold">+ RECORDING DEAL, BRAND AMBASSADORSHIP & AWARD</p>
                        </div>
                    </div>

                    {/* 2nd Place */}
                    <div className="relative h-[600px] group overflow-hidden border border-white/5 bg-neutral-900/30 rounded-2xl transition-all hover:border-white/10">
                        <div className="absolute top-10 left-10 z-20">
                            <span className="px-4 py-2 bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-full">RUNNER UP</span>
                        </div>
                        <div className="absolute bottom-12 left-10 z-20">
                            <h3 className="text-8xl font-black font-oswald text-white tracking-tighter leading-none mb-4">100K</h3>
                            <p className="text-lg text-white/60 uppercase tracking-widest font-bold mb-2">CASH PRIZE</p>
                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold">+ MEDIA FEATURE & OFFICIAL AWARD</p>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="relative h-[600px] group overflow-hidden border border-white/5 bg-neutral-900/30 rounded-2xl transition-all hover:border-white/10">
                        <div className="absolute top-10 left-10 z-20">
                            <span className="px-4 py-2 bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-full">3RD PLACE</span>
                        </div>
                        <div className="absolute bottom-12 left-10 z-20">
                            <h3 className="text-8xl font-black font-oswald text-white tracking-tighter leading-none mb-4">50K</h3>
                            <p className="text-lg text-white/60 uppercase tracking-widest font-bold mb-2">CASH PRIZE</p>
                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold">+ CONSOLATION PACKAGE & CERTIFICATE</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Prizes;
