import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [appPublicSettings, setAppPublicSettings] = useState({ id: 'local', public_settings: {} });

    useEffect(() => {
        const storedUser = localStorage.getItem('admin_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setIsLoadingAuth(false);
        setAuthChecked(true);
    }, []);

    const login = async (username, password) => {
        // Yerel basit kontrol
        if (username === 'admin' && password === 'admin123') {
            const adminUser = {
                id: 'admin-id',
                name: 'Leyla Uzun',
                email: 'admin@pkpro.com',
                role: 'admin'
            };
            setUser(adminUser);
            setIsAuthenticated(true);
            localStorage.setItem('admin_user', JSON.stringify(adminUser));
            return { success: true };
        }
        return { success: false, message: 'Hatalı kullanıcı adı veya şifre!' };
    };

    const logout = (shouldRedirect = true) => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('admin_user');
        if (shouldRedirect) window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoadingAuth,
            isLoadingPublicSettings,
            authError,
            appPublicSettings,
            authChecked,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
