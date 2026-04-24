import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Upload, Loader2, Image } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const IBAN = 'TR51 0006 2001 1350 0006 6215 56';
const ACCOUNT_NAME = 'LEYLA UZUN';

export default function StepPayment({ data, onChange }) {
    const [copied, setCopied] = useState(false);
    const [uploading, setUploading] = useState(false);

    const copyIban = () => {
        navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReceipt = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        onChange({ payment_receipt_url: file_url });
        setUploading(false);
    };

    const price = data.product_price || 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">Ödeme</h2>
                <p className="text-muted-foreground mt-2">Aşağıdaki hesaba ödemeyi yap, dekontu yükle.</p>
            </div>

            {/* Amount */}
            <div className="p-5 rounded-2xl border border-foreground bg-foreground text-center">
                <p className="text-background/70 text-sm">Ödenecek Tutar</p>
                <p className="font-display font-black text-4xl text-background mt-1">{price}₺</p>
            </div>

            {/* Bank Info */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hesap Adı</p>
                    <p className="font-display font-bold text-foreground text-lg">{ACCOUNT_NAME}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">IBAN</p>
                    <div className="flex items-center gap-3">
                        <p className="font-mono text-foreground font-medium text-sm sm:text-base break-all">{IBAN}</p>
                        <button
                            onClick={copyIban}
                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-foreground transition-colors text-sm font-medium text-foreground"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? 'Kopyalandı' : 'Kopyala'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Receipt Upload */}
            <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Dekont Fotoğrafı</p>
                <label className={`flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${data.payment_receipt_url ? 'border-foreground bg-secondary/50' : 'border-border hover:border-foreground/40'
                    }`}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleReceipt} />
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                    ) : data.payment_receipt_url ? (
                        <>
                            <img src={data.payment_receipt_url} alt="Dekont" className="max-h-40 rounded-lg object-contain" />
                            <p className="text-sm text-muted-foreground">Değiştirmek için tıkla</p>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                                <Image className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-foreground">Dekont fotoğrafını yükle</p>
                            <p className="text-xs text-muted-foreground">JPG veya PNG</p>
                        </>
                    )}
                </label>
            </div>
        </motion.div>
    );
}