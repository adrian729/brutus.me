// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';
import tailwindTypography from '@tailwindcss/typography';

function withOpacity(variableName: string) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined)
            return `rgba(var(${variableName}), ${opacityValue})`;

        return `rgb(var(${variableName}))`;
    };
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
    ],

    typescript: {
        typeCheck: true,
        strict: true,
        compilerOptions: {
            skipLibCheck: true,
        },
        exclude: ['**/node_modules'],
    },

    tailwindcss: {
        cssPath: ['~/assets/tailwind.scss', { injectPosition: 'first' }],
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
                            base: withOpacity('--color-text-base'),
                            muted: withOpacity('--color-text-muted'),
                            inverted: withOpacity('--color-text-inverted'),
                        },
                    },
                    backgroundColor: {
                        skin: {
                            'fill': withOpacity('--color-fill'),
                            'button-accent': withOpacity('--color-button-accent'),
                            'button-accent-hover': withOpacity('--color-button-accent-hover'),
                            'button-muted': withOpacity('--color-button-muted'),
                        },
                    },
                    gradientColorStops: {
                        skin: {
                            hue: withOpacity('--color-fill'),
                        },
                    },
                },
            },
            variants: {
                extend: {},
            },
            plugins: [tailwindTypography],
        },
        viewer: true,
    },

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
