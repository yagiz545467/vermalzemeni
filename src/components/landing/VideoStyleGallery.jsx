import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Zap, Smile, Briefcase, ArrowRight } from 'lucide-react';

const STYLES = [
    {
        id: 'duygusal',
        title: 'Duygusal',
        subtitle: 'Doğum Günü & Özel Anlar',
        description: 'Sevdiklerini duygulandıracak, kalpten gelen videolar.',
        icon: Heart,
        image: 'https://media.base44.com/images/public/69eba7edb18f349552764561/df376c9a4_generated_8a17d1cb.png',
        color: 'from-pink-500/20 to-transparent',
    },
    {
        id: 'hype',
        title: 'Hype',
        subtitle: 'Enerjik & Dinamik',
        description: 'Adrenalin dolu, dikkat çeken Reels videoları.',
        icon: Zap,
        image: 'https://media.base44.com/images/public/69eba7edb18f349552764561/10bb6187e_generated_e70cfe14.png',
        color: 'from-purple-500/20 to-transparent',
    },
    {
        id: 'mizah',
        title: 'Mizah',
        subtitle: 'Trend & Komedi',
        description: 'Viral olma potansiyeli yüksek, eğlenceli içerikler.',
        icon: Smile,
        image: 'https://media.base44.com/images/public/69eba7edb18f349552764561/505297df5_generated_22212c09.png',
        color: 'from-yellow-500/20 to-transparent',
    },
    {
        id: 'kurumsal',
        title: 'Kurumsal',
        subtitle: 'Tanıtım & Profesyonel',
        description: 'Markanı en iyi şekilde yansıtan profesyonel videolar.',
        icon: Briefcase,
        image: 'https://media.base44.com/images/public/69eba7edb18f349552764561/41aedfea1_generated_d59ba7e8.png',
        color: 'from-blue-500/20 to-transparent',
    },
];

export default function VideoStyleGallery() {
    return (
        <section id="stiller" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-sm font-display font-semibold uppercase tracking-widest">
                        Video Stilleri
                    </span>
                    <h2 className="font-display font-black text-foreground mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        Hangi Tarz <span className="text-primary neon-glow">Senin İçin?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
                        Her an için doğru hikaye. Tarzını seç, gerisini bize bırak.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {STYLES.map((style, index) => {
                        const Icon = style.icon;
                        return (
                            <motion.div
                                key={style.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/siparis?stil=${style.id}`}
                                    className="group block relative aspect-[3/4] rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
                                >
                                    <img
                                        src={style.image}
                                        alt={style.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${style.color}`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                {style.subtitle}
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-foreground text-xl sm:text-2xl">
                                            {style.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                                            {style.description}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            Bu Tarzı Seç <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}