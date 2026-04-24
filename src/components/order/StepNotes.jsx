import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StepNotes({ data, onChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-8"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    Notunu Bırak
                </h2>
                <p className="text-muted-foreground mt-2">Videoda neler olsun istiyorsun? Detayları paylaş.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-foreground">Video İçin Notlar</Label>
                    <Textarea
                        placeholder="Örn: Doğum günü için sürpriz bir video olsun, şarkı olarak ... kullanılsın, renk tonu pastel olsun..."
                        value={data.notes || ''}
                        onChange={(e) => onChange({ notes: e.target.value })}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-[160px] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-foreground">İletişim Bilgin (WhatsApp / E-posta)</Label>
                    <Input
                        placeholder="Sana ulaşabileceğimiz numara veya e-posta"
                        value={data.contact_info || ''}
                        onChange={(e) => onChange({ contact_info: e.target.value })}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>
        </motion.div>
    );
}