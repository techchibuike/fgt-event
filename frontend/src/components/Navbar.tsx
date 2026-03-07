import { Link, useLocation } from 'react-router-dom';
import { usePhase } from '../context/PhaseContext';

const Navbar: React.FC = () => {
    const { current, loading } = usePhase();
    const location = useLocation();
    const isHome = location.pathname === '/';

    if (loading) return null;

    const { nav, cta } = current;

    return (
        <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center w-full px-6 pointer-events-none">
            <div className="w-full max-w-[1400px] flex items-center justify-between pointer-events-auto mx-auto md:px-12">
                {/* Logo */}
                <Link to="/" className="flex flex-col group cursor-pointer">
                    <span className="text-white font-bold text-2xl tracking-tighter leading-none group-hover:text-gold-400 transition-colors uppercase">
                        FGT<span className="text-gold-500">.</span>
                    </span>
                    <span className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase mt-1">
                        FUTO'S GOT TALENT
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center glass-pill px-8 py-3 gap-8">
                        {nav.map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-gold-400 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/register"
                        className="gold-bg-gradient px-8 py-3.5 rounded-full flex items-center gap-3 shadow-xl shadow-gold-900/10 group overflow-hidden relative active:scale-95 transition-transform"
                    >
                        <span className="text-xs font-black uppercase tracking-widest text-black relative z-10">{cta}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover:translate-x-1 transition-transform relative z-10">
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
