import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image, Film, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StepUpload({ data, onChange }) {
    const [uploading, setUploading] = useState(false);

    const handleFiles = useCallback(async (files) => {
        if (!files || files.length === 0) return;
        setUploading(true);
        const uploaded = [...(data.uploaded_files || [])];

        for (const file of files) {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            uploaded.push(file_url);
        }

        onChange({ uploaded_files: uploaded });
        setUploading(false);
    }, [data.uploaded_files, onChange]);

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index) => {
        const updated = [...(data.uploaded_files || [])];
        updated.splice(index, 1);
        onChange({ uploaded_files: updated });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-8"
        >
            <div className="text-center">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    Dosyalarını Yükle
                </h2>
                <p className="text-muted-foreground mt-2">Fotoğraf ve videoları buraya bırak.</p>
            </div>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-10 sm:p-16 text-center transition-all duration-300 cursor-pointer bg-card/30"
                onClick={() => document.getElementById('file-input').click()}
            >
                <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-muted-foreground">Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Upload className="w-7 h-7 text-primary" />
                        </div>
                        <p className="text-foreground font-medium">Dosyaları sürükle veya tıkla</p>
                        <p className="text-muted-foreground text-sm">Fotoğraf ve video desteklenir</p>
                    </div>
                )}
            </div>

            {data.uploaded_files && data.uploaded_files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {data.uploaded_files.map((url, i) => (
                        <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
                            <img src={url} alt={`Yüklenen ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                                onClick={() => removeFile(i)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-foreground" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}