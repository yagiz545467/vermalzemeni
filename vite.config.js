import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    logLevel: 'info', // Show all logs including server URL
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});