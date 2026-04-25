import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Upload, Loader2, Image, ShieldAlert } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const IBAN = 'TR51 0006 2001 1350 0006 6215 56';
const ACCOUNT_NAME = 'LEYLA UZUN';
const HCAPTCHA_SITE_KEY = 'c740d370-f96e-47b4-b19e-3f747cbad0ca';

export default function StepPayment({ 
    data, 
    onChange, 
    privacyAccepted, 
    onPrivacyChange, 
    captchaVerified, 
    onCaptchaChange 
}) {
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
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            onChange({ payment_receipt_url: file_url });
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
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

            {/* Legal Disclaimer & Privacy Checkbox */}
            <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80 leading-relaxed">
                        <span className="font-bold text-red-500">YASAL UYARI:</span> Sipariş formundaki herhangi bir alana (notlar, isimler vb.) şahsa, kuruma veya topluma yönelik küfür, hakaret, aşağılayıcı veya uygunsuz içerik yazılması durumunda; tüm yasal haklarımızı saklı tuttuğumuzu, bu verilerin (IP adresi dahil) hukuki mercilerle paylaşılarak yasal işlem başlatılabileceğini beyan ederiz.
                    </p>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                    <Checkbox 
                        id="privacy" 
                        checked={privacyAccepted} 
                        onCheckedChange={onPrivacyChange}
                        className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor="privacy"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Gizlilik sözleşmesini ve KVKK metnini okudum, onaylıyorum.
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Siparişimle ilgili verilerin işlenmesine ve saklanmasına izin veriyorum.
                        </p>
                    </div>
                </div>
            </div>

            {/* hCaptcha */}
            <div className="flex justify-center pt-2">
                <HCaptcha
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={(token) => onCaptchaChange(!!token)}
                    onExpire={() => onCaptchaChange(false)}
                />
            </div>
        </motion.div>
    );
}
otion.div>
    );
}