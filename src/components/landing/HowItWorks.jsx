import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MousePointerClick, Upload, Sparkles, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEPS = [
    {
        icon: MousePointerClick,
        number: '01',
        title: 'Tarzını Seç',
        description: 'Duygusal, enerjik, komik ya da kurumsal — hangi tarz seni yansıtıyorsa onu seç.',
    },
    {
        icon: Upload,
        number: '02',
        title: 'Dosyalarını Yükle',
        description: 'Fotoğraflarını, videolarını ve istediğin müziği bize gönder.',
    },
    {
        icon: Sparkles,
        number: '03',
        title: 'Notunu Bırak',
        description: 'Videoda olmasını istediğin yazıları ve detayları paylaş.',
    },
    {
        icon: Send,
        number: '04',
        title: 'Teslim Al',
        description: '24 saat içinde profesyonelce hazırlanmış Reels videon hazır!',
    },
];

export default function HowItWorks() {
    return (
        <section id="nasil-calisir" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">


            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display font-black text-foreground mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        Nasıl Çalışır?
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
                        4 basit adımda profesyonel Reels videon hazır.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative group"
                            >
                                <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-foreground transition-all duration-300 h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="font-display font-black text-3xl text-muted-foreground/30">{step.number}</span>
                                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-muted transition-colors">
                                            <Icon className="w-5 h-5 text-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="font-display font-bold text-foreground text-lg">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Connector line (desktop only) */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-border" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link to="/siparis">
                        <Button
                            size="lg"
                            className="bg-foreground hover:bg-foreground/90 text-background font-display font-bold text-base px-8 py-6 group"
                        >
                            Başla
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}