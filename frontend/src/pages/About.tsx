import { usePhase } from '../context/PhaseContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About: React.FC = () => {
    const { loading } = usePhase();

    if (loading) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white leading-relaxed">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070"
                                alt="Event"
                                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col items-start gap-2 mb-16">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-8 h-[2px] bg-gold-500"></span>
                                <span className="text-gold-500 font-mono text-lg font-bold tracking-widest uppercase">01</span>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">BEYOND THE STAGE</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl uppercase font-bold text-white tracking-tighter font-oswald leading-[0.9]">
                                THE VISION
                            </h2>
                        </div>
                        <p className="text-2xl text-white/70 mb-12 leading-relaxed font-light">
                            FUTO'S GOT TALENT is more than just a competition; it's a movement. We provide the most prestigious platform for students to showcase their extraordinary abilities to a global audience.
                        </p>
                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 border border-gold-500/20">
                                    <span className="text-gold-500 font-bold text-2xl">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2 italic">Global Exposure</h4>
                                    <p className="text-white/50 text-lg leading-relaxed">Get noticed by industry scouts, media houses, and millions of viewers online via our live streaming protocol.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 border border-gold-500/20">
                                    <span className="text-gold-500 font-bold text-2xl">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2 italic">Talent Empowerment</h4>
                                    <p className="text-white/50 text-lg leading-relaxed">Win substantial funding, recording deals, and professional mentorship to launch your professional career.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
