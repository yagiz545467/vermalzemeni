import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Instagram, ArrowRight, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function OrderConfirmation({ orderNumber }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-6"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto"
            >
                <CheckCircle2 className="w-10 h-10 text-foreground" />
            </motion.div>

            <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    Sipariş Alındı!
                </h2>
                <p className="text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
                    Ödemeniz onaylandıktan sonra siparişiniz sıraya alınacak. Durumunu takip edebilirsin.
                </p>
            </div>

            {orderNumber && (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-foreground bg-foreground text-background">
                    <Hash className="w-4 h-4" />
                    <span className="font-display font-bold text-lg tracking-widest">{orderNumber}</span>
                </div>
            )}

            <p className="text-sm text-muted-foreground">Bu numarayı not al — sipariş durumunu sorgulamak için kullanabilirsin.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link to={`/siparis-durumu?no=${orderNumber}`}>
                    <Button className="bg-foreground hover:bg-foreground/90 text-background font-display gap-2">
                        Sipariş Durumumu Gör
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
                <a
                    href="https://instagram.com/profilimikiraliyorum"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outline" className="border-border text-foreground gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram
                    </Button>
                </a>
            </div>

            <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
                Ana Sayfaya Dön
            </Link>
        </motion.div>
    );
}