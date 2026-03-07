import React from 'react';

const Footer: React.FC = () => (
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
                        <p className="text-sm font-bold text-gold-500">hello@fgt.alphoch.com</p>
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
);

export default Footer;
