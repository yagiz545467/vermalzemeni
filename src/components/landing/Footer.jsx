import React from 'react';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                        <span className="font-display font-bold text-foreground tracking-tight">
                            profilimi<span className="text-primary">kiralıyorum</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://instagram.com/profilimikiraliyorum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                            <Instagram className="w-4 h-4" />
                            @profilimikiraliyorum
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} profilimikiralıyorum. Tüm hakları saklıdır.</p>
                    <p>Dijital içerik üretim stüdyosu</p>
                </div>
            </div>
        </footer>
    );
}