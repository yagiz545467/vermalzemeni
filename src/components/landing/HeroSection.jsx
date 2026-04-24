import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                >
                    <a
                        href="https://instagram.com/profilimikiraliyorum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary text-muted-foreground text-sm hover:border-foreground transition-colors"
                    >
                        <Instagram className="w-3.5 h-3.5" />
                        @profilimikiraliyorum
                    </a>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-display font-black text-foreground leading-[1] tracking-tight"
                    style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
                >
                    Unutulmaz bir anı bırak.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="mt-6 text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
                >
                    Sana, arkadaşına veya markana özel hazırlanan Reels videoları ile Instagram profilini farklılaştır.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link to="/siparis">
                        <Button
                            size="lg"
                            className="bg-foreground hover:bg-foreground/90 text-background font-display font-bold text-base px-8 py-6 group"
                        >
                            Sipariş Ver
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <button
                        onClick={() => document.getElementById('fiyatlar')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 text-base"
                    >
                        Fiyatlara Bak
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>

                {/* Divider info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 pt-10 border-t border-border flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm text-muted-foreground"
                >
                    <span>📌 Bugün verilen siparişler yarın paylaşılır</span>
                    <span>⚡ Erken teslimat mevcut</span>
                    <span>📱 Instagram'a özel format</span>
                </motion.div>
            </div>
        </section>
    );
}