import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const result = await login(username, password);
        if (!result.success) {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-2xl mx-auto mb-4 object-contain shadow-lg" />
                    <h1 className="font-display font-black text-3xl text-foreground">Admin Girişi</h1>
                    <p className="text-muted-foreground mt-2">Devam etmek için bilgilerinizi girin.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-3xl border border-border bg-card">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Kullanıcı Adı</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10"
                                placeholder="admin"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Şifre</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-foreground hover:bg-foreground/90 text-background font-display font-bold py-6 rounded-xl"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Giriş Yap'}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
