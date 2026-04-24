import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, AlertCircle } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'full-paket',
        title: 'Full Paket',
        price: 600,
        description: 'Tüm içerik türlerini kapsayan, eksiksiz bir Instagram içerik paketi.',
        badge: 'En İyi Değer',
        wide: true,
        dark: true,
    },
    {
        id: 'ozel-reels',
        title: 'Özel Reels Reklamı',
        price: 300,
        description: 'Profilinde öne çıkacak, tam anlamıyla kişiselleştirilmiş Reels reklamı.',
        badge: 'Popüler',
        dark: true,
        note: 'Erken teslimat +100₺ (toplam 400₺)',
    },
    {
        id: 'hikaye-reklamı',
        title: 'Hikâye Reklamı',
        price: 100,
        description: 'Instagram hikayelerinde yayınlanacak özel reklam videosu.',
    },
    {
        id: 'selam-videosu',
        title: 'Selam Videosu',
        price: 150,
        description: 'Kişiye özel hazırlanmış, samimi bir selamlama videosu.',
        note: 'Reels olarak paylaşılmaz — size özel teslim edilir.',
    },
    {
        id: 'dogum-gunu',
        title: 'Doğum Günü Videosu',
        price: 150,
        description: 'Sevdiklerini mutlu edecek özel doğum günü kutlama videosu.',
        note: 'Reels olarak paylaşılmaz — size özel teslim edilir.',
    },
];

export default function PricingSection() {
    return (
        <section id="fiyatlar" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/40">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="font-display font-black text-foreground" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        Fiyatlar
                    </h2>
                    <p className="text-muted-foreground text-lg mt-3 max-w-lg mx-auto">
                        Hepsinde aynı özen, her bütçeye uygun seçenek.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.07 }}
                        >
                            <Link
                                to={`/siparis?urun=${product.id}`}
                                className={`group flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${product.dark
                                        ? 'border-foreground bg-foreground hover:bg-foreground/90'
                                        : 'border-border bg-background hover:border-foreground'
                                    }`}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h3 className={`font-display font-bold text-lg ${product.dark ? 'text-background' : 'text-foreground'}`}>
                                            {product.title}
                                        </h3>
                                        {product.badge && (
                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${product.dark ? 'bg-background/20 text-background' : 'bg-secondary text-foreground'
                                                }`}>
                                                {product.id === 'full-paket' ? <Zap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm leading-relaxed ${product.dark ? 'text-background/70' : 'text-muted-foreground'}`}>
                                        {product.description}
                                    </p>
                                    {product.note && (
                                        <p className={`text-xs mt-1.5 flex items-center gap-1 ${product.dark ? 'text-background/50' : 'text-muted-foreground/70'}`}>
                                            <AlertCircle className="w-3 h-3 shrink-0" />
                                            {product.note}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <span className={`font-display font-black text-2xl sm:text-3xl ${product.dark ? 'text-background' : 'text-foreground'}`}>
                                        {product.price}₺
                                    </span>
                                    <span className={`hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 ${product.dark ? 'text-background' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                        Sipariş Ver <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 p-4 rounded-xl border border-border bg-background text-sm text-muted-foreground text-center leading-relaxed"
                >
                    📌 Paylaşımlar Özel Reels reklamıdır. Bugün verilen siparişler yarın paylaşılır.
                </motion.div>
            </div>
        </section>
    );
}