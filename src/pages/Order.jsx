import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

import Navbar from '../components/landing/Navbar';
import StepProduct from '../components/order/StepProduct';
import StepRecipient from '../components/order/StepRecipient';
import StepUpload from '../components/order/StepUpload';
import StepNotes from '../components/order/StepNotes';
import StepPayment from '../components/order/StepPayment';
import OrderConfirmation from '../components/order/OrderConfirmation';

const STEP_LABELS = ['Ürün', 'Kimin İçin', 'Dosyalar', 'Notlar', 'Ödeme'];

function generateOrderNumber() {
    return 'PK' + Date.now().toString().slice(-6);
}

export default function Order() {
    const [step, setStep] = useState(0);
    const [createdOrderNumber, setCreatedOrderNumber] = useState(null);
    const [formData, setFormData] = useState({
        product: '',
        product_price: 0,
        early_delivery: false,
        recipient_type: '',
        recipient_name: '',
        uploaded_files: [],
        notes: '',
        instagram_handle: '',
        contact_info: '',
        payment_receipt_url: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urun = params.get('urun');
        const PRICES = { 'full-paket': 600, 'ozel-reels': 300, 'hikaye-reklamı': 100, 'selam-videosu': 150, 'dogum-gunu': 150 };
        if (urun && PRICES[urun]) {
            setFormData((prev) => ({ ...prev, product: urun, product_price: PRICES[urun] }));
        }
    }, []);

    const updateData = (partial) => setFormData((prev) => ({ ...prev, ...partial }));

    const createOrder = useMutation({
        mutationFn: (data) => base44.entities.Order.create(data),
        onSuccess: (result) => setCreatedOrderNumber(result.order_number),
    });

    const handleSubmit = () => {
        const orderNumber = generateOrderNumber();
        createOrder.mutate({
            order_number: orderNumber,
            product: formData.product,
            product_price: formData.product_price,
            early_delivery: formData.early_delivery,
            recipient_type: formData.recipient_type || 'kendim',
            recipient_name: formData.recipient_name,
            uploaded_files: formData.uploaded_files,
            notes: formData.notes,
            instagram_handle: formData.instagram_handle,
            contact_info: formData.contact_info,
            payment_receipt_url: formData.payment_receipt_url,
            status: 'odeme-bekleniyor',
        });
    };

    const canProceed = () => {
        if (step === 0) return !!formData.product;
        if (step === 1) return !!formData.recipient_type;
        return true;
    };

    if (createdOrderNumber !== null) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 sm:pt-32 px-4 max-w-2xl mx-auto">
                    <OrderConfirmation orderNumber={createdOrderNumber} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 sm:pt-32 pb-16 px-4 max-w-2xl mx-auto">
                {/* Progress */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                        {STEP_LABELS.map((label, i) => (
                            <button
                                key={label}
                                onClick={() => i < step && setStep(i)}
                                className={`text-xs sm:text-sm font-medium transition-colors ${i <= step ? 'text-foreground' : 'text-muted-foreground'
                                    } ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-foreground rounded-full transition-all duration-500"
                            style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                    {step === 0 && <StepProduct key="s0" data={formData} onChange={updateData} />}
                    {step === 1 && <StepRecipient key="s1" data={formData} onChange={updateData} />}
                    {step === 2 && <StepUpload key="s2" data={formData} onChange={updateData} />}
                    {step === 3 && <StepNotes key="s3" data={formData} onChange={updateData} />}
                    {step === 4 && <StepPayment key="s4" data={formData} onChange={updateData} />}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button
                        variant="ghost"
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="text-muted-foreground hover:text-foreground gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Geri
                    </Button>

                    {step < 4 ? (
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                            className="bg-foreground hover:bg-foreground/90 text-background font-display font-semibold gap-2"
                        >
                            İleri
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={createOrder.isPending}
                            className="bg-foreground hover:bg-foreground/90 text-background font-display font-bold gap-2 px-8"
                        >
                            {createOrder.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                <>
                                    Siparişi Gönder
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}