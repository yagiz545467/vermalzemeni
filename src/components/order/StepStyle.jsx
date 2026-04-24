import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Smile, Briefcase } from 'lucide-react';

const STYLES = [
    { id: 'duygusal', label: 'Duygusal', desc: 'Doğum günü, anma, özel anlar', icon: Heart, accent: 'border-pink-500/50 bg-pink-500/5' },
    { id: 'hype', label: 'Hype', desc: 'Enerjik, dinamik, dikkat çekici', icon: Zap, accent: 'border-purple-500/50 bg-purple-500/5' },
    { id: 'mizah', label: 'Mizah', desc: 'Trend, komedi, viral potansiyel', icon: Smile, accent: 'border-yellow-500/50 bg-yellow-500/5' },
    { id: 'kurumsal', label: 'Kurumsal', desc: 'Profesyonel, tanıtım, marka', icon: Briefcase, accent: 'border-blue-500/50 bg-blue-500/5' },
];

export default function StepStyle({ data, onChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-8"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    Video Tarzını Seç
                </h2>
                <p className="text-muted-foreground mt-2">Her tarz farklı bir hikaye anlatır.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STYLES.map((style) => {
                    const Icon = style.icon;
                    const isSelected = data.video_style === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => onChange({ video_style: style.id })}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 ${isSelected
                                    ? `${style.accent} neon-box-glow`
                                    : 'border-border bg-card hover:border-muted-foreground/30'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                <h3 className="font-display font-bold text-foreground text-lg">{style.label}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">{style.desc}</p>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}