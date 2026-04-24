import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Hash, Clock, ListOrdered, Cog, CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const STATUS_CONFIG = {
    'odeme-bekleniyor': { label: 'Ödeme Bekleniyor', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
    'sirada': { label: 'Sırada', icon: ListOrdered, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    'hazirlaniyor': { label: 'Hazırlanıyor', icon: Cog, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
    'teslim-edildi': { label: 'Teslim Edildi', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
    'iptal': { label: 'İptal Edildi', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

const PRODUCT_LABELS = {
    'full-paket': 'Full Paket',
    'ozel-reels': 'Özel Reels Reklamı',
    'hikaye-reklamı': 'Hikâye Reklamı',
    'selam-videosu': 'Selam Videosu',
    'dogum-gunu': 'Doğum Günü Videosu',
};

export default function OrderStatus() {
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    // Pre-fill from URL
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const no = params.get('no');
        if (no) { setQuery(no); handleSearch(no); }
    }, []);

    const handleSearch = async (searchNo) => {
        const no = (searchNo || query).trim().toUpperCase();
        if (!no) return;
        setLoading(true);
        setNotFound(false);
        setOrder(null);
        const results = await base44.entities.Order.filter({ order_number: no });
        setLoading(false);
        if (results && results.length > 0) {
            setOrder(results[0]);
        } else {
            setNotFound(true);
        }
    };

    const status = order ? STATUS_CONFIG[order.status] || STATUS_CONFIG['odeme-bekleniyor'] : null;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-24 sm:pt-32 pb-16 px-4">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">Sipariş Durumu</h1>
                        <p className="text-muted-foreground mt-3">Sipariş numaranı gir, durumunu öğren.</p>
                    </motion.div>

                    <div className="flex gap-2">
                        <Input
                            placeholder="Sipariş No (örn: PK123456)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="font-mono"
                        />
                        <Button onClick={() => handleSearch()} disabled={loading} className="bg-foreground hover:bg-foreground/90 text-background shrink-0">
                            {loading ? <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                        </Button>
                    </div>

                    {notFound && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                            <p className="text-muted-foreground">Bu numaraya ait sipariş bulunamadı.</p>
                        </motion.div>
                    )}

                    {order && status && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                            {/* Status badge */}
                            <div className={`flex items-center gap-3 p-4 rounded-2xl border ${status.bg}`}>
                                <status.icon className={`w-6 h-6 ${status.color}`} />
                                <div>
                                    <p className="text-xs text-muted-foreground">Durum</p>
                                    <p className={`font-display font-bold text-lg ${status.color}`}>{status.label}</p>
                                </div>
                            </div>

                            {/* Order details */}
                            <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-mono font-bold text-foreground">{order.order_number}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground text-xs uppercase tracking-wider">Ürün</p>
                                        <p className="font-medium text-foreground mt-0.5">{PRODUCT_LABELS[order.product] || order.product}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs uppercase tracking-wider">Tutar</p>
                                        <p className="font-display font-bold text-foreground mt-0.5">{order.product_price}₺</p>
                                    </div>
                                    {order.recipient_name && (
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase tracking-wider">Kişi</p>
                                            <p className="font-medium text-foreground mt-0.5">{order.recipient_name}</p>
                                        </div>
                                    )}
                                    {order.instagram_handle && (
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase tracking-wider">Instagram</p>
                                            <p className="font-medium text-foreground mt-0.5">{order.instagram_handle}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="p-5 rounded-2xl border border-border bg-card">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Süreç</p>
                                {['odeme-bekleniyor', 'sirada', 'hazirlaniyor', 'teslim-edildi'].map((s) => {
                                    const cfg = STATUS_CONFIG[s];
                                    const statuses = ['odeme-bekleniyor', 'sirada', 'hazirlaniyor', 'teslim-edildi'];
                                    const currentIndex = statuses.indexOf(order.status);
                                    const thisIndex = statuses.indexOf(s);
                                    const isDone = thisIndex <= currentIndex && order.status !== 'iptal';
                                    const isCurrent = s === order.status;
                                    return (
                                        <div key={s} className="flex items-center gap-3 py-2">
                                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${isDone ? 'bg-foreground border-foreground' : 'bg-background border-border'
                                                }`}>
                                                {isDone && <cfg.icon className="w-3.5 h-3.5 text-background" />}
                                            </div>
                                            <span className={`text-sm font-medium ${isCurrent ? 'text-foreground' : isDone ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {cfg.label}
                                            </span>
                                            {isCurrent && <span className="text-xs text-muted-foreground ml-auto">Şu an</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}