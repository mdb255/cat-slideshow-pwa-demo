import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: 'prompt',
        injectRegister: false,

        pwaAssets: {
            disabled: false,
            config: true,
        },

        manifest: {
            name: 'Cat Slideshow Demo',
            short_name: 'Cat Slideshow',
            description: 'Cat Slideshow Demo',
            theme_color: '#6d0fab',
            background_color: '#6d0fab',
            icons: [
                {
                    src: 'favicon_v2.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    // Used when installing on Android
                    src: 'favicon_maskable.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        },

        workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
        },

        devOptions: {
            enabled: false,
            navigateFallback: 'index.html',
            suppressWarnings: true,
            type: 'module',
        },
    })],
})