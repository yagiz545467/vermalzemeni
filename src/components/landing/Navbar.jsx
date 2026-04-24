import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-background/95 backdrop-blur-xl border-b border-border'
                        : 'bg-background/60 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                            <span className="font-display font-bold text-foreground text-sm sm:text-base tracking-tight">
                                profilimi<span className="text-primary">kiralıyorum</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={() => scrollToSection('stiller')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Stiller
                            </button>
                            <button onClick={() => scrollToSection('nasil-calisir')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Nasıl Çalışır
                            </button>
                            <a
                                href="https://instagram.com/profilimikiraliyorum"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <Instagram className="w-4 h-4" />
                                Instagram
                            </a>
                            <Link to="/siparis">
                                <Button className="bg-foreground hover:bg-foreground/90 text-background font-display font-semibold">
                                    Sipariş Ver
                                </Button>
                            </Link>
                        </div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-foreground p-2"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6"
                    >
                        <div className="flex flex-col gap-6 items-center text-center">
                            <button onClick={() => scrollToSection('stiller')} className="text-2xl font-display text-foreground hover:text-primary transition-colors">
                                Stiller
                            </button>
                            <button onClick={() => scrollToSection('nasil-calisir')} className="text-2xl font-display text-foreground hover:text-primary transition-colors">
                                Nasıl Çalışır
                            </button>
                            <a
                                href="https://instagram.com/profilimikiraliyorum"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-display text-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <Instagram className="w-6 h-6" />
                                Instagram
                            </a>
                            <Link to="/siparis" onClick={() => setMobileOpen(false)}>
                                <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-display font-semibold text-lg px-10">
                                    Sipariş Ver
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}