import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Sponsors: React.FC = () => {
    const { loading } = usePhase();

    if (loading) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
                <div className="flex flex-col items-center gap-2 mb-24">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                        <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">05</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">OUR PARTNERS</span>
                        <span className="w-8 h-[2px] bg-gold-500"></span>
                    </div>
                    <h2 className="text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9]">
                        GLOBAL SPONSORS
                    </h2>
                    <p className="text-white/40 max-w-2xl mt-8 text-lg font-light">
                        The partners who make Season 2.0 possible. We are proud to partner with brands that believe in the power of student talent.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="group relative aspect-video bg-neutral-900 border border-white/5 rounded-2xl flex items-center justify-center p-12 grayscale hover:grayscale-0 transition-all cursor-pointer hover:border-gold-500/30 overflow-hidden">
                            <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-white/10 font-black italic tracking-tighter uppercase text-3xl group-hover:text-gold-500/30 transition-colors">PARTNER {i}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-32 p-16 border border-gold-500/20 bg-gold-500/5 rounded-3xl max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">BECOME A SPONSOR</h3>
                    <p className="text-white/60 text-lg mb-10">
                        Join us in empowering the next generation of creative stars. Reach out to our partnership team to explore sponsorship tiers.
                    </p>
                    <a href="mailto:partners@fgt.alphoch.com" className="inline-block gold-bg-gradient px-12 py-4 rounded-full text-black font-black uppercase tracking-widest shadow-xl shadow-gold-900/20 hover:scale-105 active:scale-95 transition-all">
                        Get In Touch
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Sponsors;
