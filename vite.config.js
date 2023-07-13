import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    server: {
        host: '0.0.0.0',
    },
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
})
