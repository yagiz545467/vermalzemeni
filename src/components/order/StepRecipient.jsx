import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RECIPIENTS = [
    { id: 'kendim', label: 'Kendim İçin', desc: 'Kendi profilim için bir video istiyorum', icon: User },
    { id: 'arkadas', label: 'Arkadaşım İçin', desc: 'Bir hediye olarak video hazırlayın', icon: Users },
    { id: 'marka', label: 'Markam İçin', desc: 'İşletmem/markam için profesyonel içerik', icon: Building2 },
];

export default function StepRecipient({ data, onChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-8"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    Video Kimin İçin?
                </h2>
                <p className="text-muted-foreground mt-2">Hedef kitleni belirle, biz ona göre hazırlayalım.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RECIPIENTS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = data.recipient_type === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onChange({ recipient_type: item.id })}
                            className={`p-5 rounded-2xl border text-left transition-all duration-300 ${isSelected
                                    ? 'border-primary bg-primary/5 neon-box-glow'
                                    : 'border-border bg-card hover:border-muted-foreground/30'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-primary/20' : 'bg-muted'
                                }`}>
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <h3 className="font-display font-bold text-foreground">{item.label}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-foreground">İsim</Label>
                    <Input
                        placeholder="Videonun kimin için olduğunu yaz"
                        value={data.recipient_name || ''}
                        onChange={(e) => onChange({ recipient_name: e.target.value })}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-foreground">Instagram Kullanıcı Adı</Label>
                    <Input
                        placeholder="@kullaniciadi"
                        value={data.instagram_handle || ''}
                        onChange={(e) => onChange({ instagram_handle: e.target.value })}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>
        </motion.div>
    );
}