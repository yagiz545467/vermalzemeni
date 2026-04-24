import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Star, Zap } from 'lucide-react';

const PRODUCTS = [
    { id: 'full-paket', title: 'Full Paket', price: 600, badge: 'En İyi Değer', dark: true },
    { id: 'ozel-reels', title: 'Özel Reels Reklamı', price: 300, badge: 'Popüler', note: 'Erken teslimat +100₺', dark: true },
    { id: 'hikaye-reklamı', title: 'Hikâye Reklamı', price: 100 },
    { id: 'selam-videosu', title: 'Selam Videosu', price: 150, note: 'Reels olarak paylaşılmaz' },
    { id: 'dogum-gunu', title: 'Doğum Günü Videosu', price: 150, note: 'Reels olarak paylaşılmaz' },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

export default function StepProduct({ data, onChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">Ne Almak İstiyorsun?</h2>
                <p className="text-muted-foreground mt-2">Bir ürün seç, fiyatı otomatik belirlenir.</p>
            </div>

            <div className="space-y-3">
                {PRODUCTS.map((product) => {
                    const isSelected = data.product === product.id;
                    return (
                        <button
                            key={product.id}
                            onClick={() => onChange({ product: product.id, product_price: product.price })}
                            className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${isSelected
                                    ? 'border-foreground bg-foreground'
                                    : 'border-border bg-background hover:border-foreground/40'
                                }`}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`font-display font-bold ${isSelected ? 'text-background' : 'text-foreground'}`}>
                                        {product.title}
                                    </span>
                                    {product.badge && (
                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-background/20 text-background' : 'bg-secondary text-foreground'
                                            }`}>
                                            {product.id === 'full-paket' ? <Zap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                                            {product.badge}
                                        </span>
                                    )}
                                </div>
                                {product.note && (
                                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${isSelected ? 'text-background/60' : 'text-muted-foreground'}`}>
                                        <AlertCircle className="w-3 h-3 shrink-0" />
                                        {product.note}
                                    </p>
                                )}
                            </div>
                            <span className={`font-display font-black text-xl shrink-0 ${isSelected ? 'text-background' : 'text-foreground'}`}>
                                {product.price}₺
                            </span>
                        </button>
                    );
                })}
            </div>

            {data.product === 'ozel-reels' && (
                <div className="border border-border rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium text-foreground">Erken teslimat ister misin? (+100₺)</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onChange({ early_delivery: true, product_price: 400 })}
                            className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${data.early_delivery ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground hover:border-foreground/40'
                                }`}
                        >
                            Evet, 400₺
                        </button>
                        <button
                            onClick={() => onChange({ early_delivery: false, product_price: 300 })}
                            className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${!data.early_delivery ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground hover:border-foreground/40'
                                }`}
                        >
                            Hayır, 300₺
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}