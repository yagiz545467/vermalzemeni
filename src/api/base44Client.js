import { supabase } from './supabaseClient';

export const base44 = {
    auth: {
        me: async () => {
            const storedUser = localStorage.getItem('admin_user');
            return storedUser ? JSON.parse(storedUser) : null;
        },
        logout: (redirectUrl) => {
            localStorage.removeItem('admin_user');
            if (redirectUrl) window.location.href = redirectUrl;
        },
        redirectToLogin: (redirectUrl) => {
            window.location.href = '/admin';
        }
    },
    entities: {
        Order: {
            list: async (sort, limit) => {
                let query = supabase.from('orders').select('*');
                
                if (sort === '-created_date' || sort === '-created_at') {
                    query = query.order('created_at', { ascending: false });
                }
                
                if (limit) {
                    query = query.limit(limit);
                }
                
                const { data, error } = await query;
                if (error) throw error;
                return data || [];
            },
            create: async (orderData) => {
                const { data, error } = await supabase
                    .from('orders')
                    .insert([orderData])
                    .select();
                
                if (error) throw error;
                return data[0];
            },
            update: async (id, updateData) => {
                const { data, error } = await supabase
                    .from('orders')
                    .update(updateData)
                    .eq('id', id)
                    .select();
                
                if (error) throw error;
                return data[0];
            },
            filter: async (params) => {
                let query = supabase.from('orders').select('*');
                
                Object.entries(params).forEach(([key, val]) => {
                    query = query.eq(key, val);
                });
                
                const { data, error } = await query;
                if (error) throw error;
                return data || [];
            }
        }
    },
    integrations: {
        Core: {
            UploadFile: async ({ file }) => {
                // Supabase Storage'a yükleme (Public 'receipts' bucket'ı gerektiğini unutma)
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { data, error } = await supabase.storage
                    .from('uploads') // Supabase'de 'uploads' adında bir bucket oluşturmalısın
                    .upload(filePath, file);

                if (error) {
                    console.error('Upload error:', error);
                    // Hata durumunda base64 fallback (geçici çözüm)
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve({ file_url: reader.result });
                        reader.readAsDataURL(file);
                    });
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('uploads')
                    .getPublicUrl(filePath);

                return { file_url: publicUrl };
            }
        }
    }
};
