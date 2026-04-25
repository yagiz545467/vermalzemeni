import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Hash, Clock, ListOrdered, Cog, CheckCircle2, XCircle, ChevronDown, Image, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const STATUS_CONFIG = {
    'odeme-bekleniyor': { label: 'Ödeme Bekleniyor', icon: Clock, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    'sirada': { label: 'Sırada', icon: ListOrdered, className: 'bg-blue-100 text-blue-800 border-blue-200' },
    'hazirlaniyor': { label: 'Hazırlanıyor', icon: Cog, className: 'bg-purple-100 text-purple-800 border-purple-200' },
    'teslim-edildi': { label: 'Teslim Edildi', icon: CheckCircle2, className: 'bg-green-100 text-green-800 border-green-200' },
    'iptal': { label: 'İptal Edildi', icon: XCircle, className: 'bg-red-100 text-red-800 border-red-200' },
};

const PRODUCT_LABELS = {
    'full-paket': 'Full Paket',
    'ozel-reels': 'Özel Reels',
    'hikaye-reklamı': 'Hikâye Reklamı',
    'selam-videosu': 'Selam Videosu',
    'dogum-gunu': 'Doğum Günü',
};

function OrderRow({ order }) {
    const [expanded, setExpanded] = useState(false);
    const [receiptOpen, setReceiptOpen] = useState(false);
    const queryClient = useQueryClient();

    const updateStatus = useMutation({
        mutationFn: (status) => base44.entities.Order.update(order.id, { status }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
    });

    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['odeme-bekleniyor'];
    const Icon = cfg.icon;

    return (
        <>
            <tr
                className="border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <td className="py-3 px-4">
                    <span className="font-mono text-sm font-bold text-foreground">{order.order_number || '—'}</span>
                </td>
                <td className="py-3 px-4 text-sm text-foreground">{PRODUCT_LABELS[order.product] || order.product}</td>
                <td className="py-3 px-4 text-sm font-display font-bold text-foreground">{order.product_price}₺</td>
                <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.className}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                    </span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                    {new Date(order.created_at || order.created_date).toLocaleDateString('tr-TR')}
                </td>
                <td className="py-3 px-4">
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </td>
            </tr>

            {expanded && (
                <tr className="border-b border-border bg-secondary/20">
                    <td colSpan={6} className="px-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2 text-sm">
                                <p><span className="text-muted-foreground">Kişi:</span> <span className="font-medium">{order.recipient_name || '—'}</span></p>
                                <p><span className="text-muted-foreground">Instagram:</span> <span className="font-medium">{order.instagram_handle || '—'}</span></p>
                                <p><span className="text-muted-foreground">İletişim:</span> <span className="font-medium">{order.contact_info || '—'}</span></p>
                                <p><span className="text-muted-foreground">Erken Teslimat:</span> <span className="font-medium">{order.early_delivery ? 'Evet' : 'Hayır'}</span></p>
                                <p><span className="text-muted-foreground">IP Adresi:</span> <span className="font-mono text-xs font-medium bg-secondary/50 px-1.5 py-0.5 rounded">{order.ip_address || '—'}</span></p>
                            </div>

                            {order.notes && (
                                <div className="text-sm">
                                    <p className="text-muted-foreground mb-1">Notlar:</p>
                                    <p className="text-foreground bg-background rounded-lg p-3 border border-border leading-relaxed">{order.notes}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {order.payment_receipt_url && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1.5">Ödeme Dekontu:</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setReceiptOpen(!receiptOpen); }}
                                            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                                        >
                                            {receiptOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {receiptOpen ? 'Dekontu Gizle' : 'Dekontu Göster'}
                                        </button>
                                        {receiptOpen && (
                                            <div className="mt-2 p-2 bg-background rounded-lg border border-border">
                                                <img src={order.payment_receipt_url} alt="Dekont" className="max-h-64 rounded-md object-contain mx-auto" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {order.uploaded_files && order.uploaded_files.length > 0 && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1.5">Sipariş Dosyaları ({order.uploaded_files.length}):</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {order.uploaded_files.map((url, idx) => (
                                                <a 
                                                    key={idx} 
                                                    href={url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="aspect-square rounded-lg border border-border overflow-hidden bg-background hover:opacity-80 transition-opacity"
                                                >
                                                    <img src={url} alt={`Dosya ${idx + 1}`} className="w-full h-full object-cover" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div onClick={(e) => e.stopPropagation()} className="pt-2">
                                    <p className="text-xs text-muted-foreground mb-1.5">Durum Değiştir:</p>
                                    <Select
                                        value={order.status}
                                        onValueChange={(val) => updateStatus.mutate(val)}
                                        disabled={updateStatus.isPending}
                                    >
                                        <SelectTrigger className="h-8 text-sm w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                                                <SelectItem key={val} value={val}>{cfg.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function Admin() {
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: () => base44.entities.Order.list('-created_date', 100),
    });

    const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

    const counts = Object.keys(STATUS_CONFIG).reduce((acc, s) => {
        acc[s] = orders.filter(o => o.status === s).length;
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                            <span className="text-background font-display font-bold text-sm">P</span>
                        </div>
                        <span className="font-display font-bold text-foreground">Admin Panel</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{orders.length} sipariş</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                        const Icon = cfg.icon;
                        return (
                            <button
                                key={key}
                                onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
                                className={`p-3 rounded-xl border text-left transition-all ${filterStatus === key ? 'border-foreground bg-foreground' : 'border-border bg-card hover:border-foreground/30'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 mb-1.5 ${filterStatus === key ? 'text-background' : 'text-muted-foreground'}`} />
                                <p className={`font-display font-black text-xl ${filterStatus === key ? 'text-background' : 'text-foreground'}`}>{counts[key]}</p>
                                <p className={`text-xs mt-0.5 ${filterStatus === key ? 'text-background/70' : 'text-muted-foreground'}`}>{cfg.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Table */}
                <div className="border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50">
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">No</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ürün</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tutar</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Durum</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tarih</th>
                                    <th className="py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-muted-foreground">Yükleniyor...</td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-muted-foreground">Sipariş yok</td>
                                    </tr>
                                ) : (
                                    filtered.map((order) => <OrderRow key={order.id} order={order} />)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}