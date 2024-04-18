// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';
import tailwindTypography from '@tailwindcss/typography';

function customColorWithAlpha(color: string) {
    return `rgb(from var(${color}) r g b / <alpha-value>)`;
}

export default defineNuxtConfig({
    head: {
        title: 'portfolio-nuxt-tailwindcss-typescript',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    devtools: { enabled: true },

    alias: {
        '@': resolve(__dirname, '/'),
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@hebilicious/vue-query-nuxt',
        '@nuxtjs/html-validator',
    ],

    typescript: {
        typeCheck: true,
        strict: true,
        compilerOptions: {
            skipLibCheck: true,
            module: 'ESNext',
            lib: ['ESNext'],
            target: 'esnext',
        },
        exclude: ['**/node_modules', '**/.nuxt', '**/dist', '**/.git', '**/pnpm-lock.yaml', '**/yarn.lock', '**/package-lock.json'],
    },

    tailwindcss: {
        cssPath: ['~/assets/tailwind.scss', { injectPosition: 'first' }],
        viewer: true,
        configPath: 'tailwind.config',
        exposeConfig: {
            level: 2,
        },
        config: {
            darkMode: 'class',
            content: [
                './components/**/*.{js,vue,ts}',
                './layouts/**/*.vue',
                './pages/**/*.vue',
                './plugins/**/*.{js,ts}',
                './app.vue',
                './error.vue',
            ],
            theme: {
                extend: {
                    textColor: {
                        skin: {
                            base: customColorWithAlpha('--color-text-base'),
                            muted: customColorWithAlpha('--color-text-muted'),
                            inverted: customColorWithAlpha('--color-text-inverted'),
                        },
                    },
                    backgroundColor: {
                        skin: {
                            'fill': customColorWithAlpha('--color-fill'),
                            'button-accent': customColorWithAlpha('--color-button-accent'),
                            'button-accent-hover': customColorWithAlpha('--color-button-accent-hover'),
                            'button-muted': customColorWithAlpha('--color-button-muted'),
                        },
                    },
                    gradientColorStops: {
                        skin: {
                            hue: customColorWithAlpha('--color-fill'),
                        },
                    },
                },
            },
            variants: {
                extend: {},
            },
            plugins: [tailwindTypography],
        },
    },

    css: [],

    colorMode: {
        classSuffix: '',
    },

    // TODO: config i18n for SS-translations and SEO at https://i18n.nuxtjs.org/docs/guide/server-side-translations and https://i18n.nuxtjs.org/docs/guide/seo
    i18n: {
        strategy: 'prefix_and_default',
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                iso: 'en-US',
            },
            {
                code: 'es',
                iso: 'es-ES',
            },
            {
                code: 'fr',
                iso: 'fr-FR',
            },
        ],
    },

});
