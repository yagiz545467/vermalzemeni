// Mocking the base44 client for local development
const mockStorage = {
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch {
            return [];
        }
    },
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const base44 = {
    auth: {
        me: async () => {
            return {
                id: 'local-user-id',
                name: 'Local Admin',
                email: 'admin@local.com',
                role: 'admin'
            };
        },
        logout: (redirectUrl) => {
            console.log('Logged out locally');
            if (redirectUrl) window.location.href = redirectUrl;
        },
        redirectToLogin: (redirectUrl) => {
            console.log('Redirecting to login (mock)');
            window.location.href = '/';
        }
    },
    entities: {
        Order: {
            list: async (sort, limit) => {
                let orders = mockStorage.getItem('local_orders');
                if (sort === '-created_date') {
                    orders.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
                }
                return orders.slice(0, limit || 100);
            },
            create: async (data) => {
                const orders = mockStorage.getItem('local_orders');
                const newOrder = {
                    ...data,
                    id: 'ord_' + Math.random().toString(36).substr(2, 9),
                    created_date: new Date().toISOString()
                };
                orders.push(newOrder);
                mockStorage.setItem('local_orders', orders);
                return newOrder;
            },
            update: async (id, data) => {
                let orders = mockStorage.getItem('local_orders');
                orders = orders.map(o => o.id === id ? { ...o, ...data } : o);
                mockStorage.setItem('local_orders', orders);
                return orders.find(o => o.id === id);
            },
            filter: async (params) => {
                const orders = mockStorage.getItem('local_orders');
                return orders.filter(o => {
                    return Object.entries(params).every(([key, val]) => o[key] === val);
                });
            }
        }
    },
    integrations: {
        Core: {
            UploadFile: async ({ file }) => {
                console.log('Mocking file upload for:', file.name);
                // Return a fake URL (or base64 if small, but let's keep it simple)
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({ file_url: reader.result });
                    };
                    reader.readAsDataURL(file);
                });
            }
        }
    }
};
