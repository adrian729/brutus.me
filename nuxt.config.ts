// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';

function customColorWithAlpha(color: string) {
    return `rgb(from var(${color}) r g b / <alpha-value>)`;
}

export default defineNuxtConfig({
    app: {
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
            htmlAttrs: {
                lang: 'en',
            },
            noscript: [
                { children: 'JavaScript is required' },
            ],
        },
    },

    devtools: { enabled: true },

    alias: {
        '@': resolve(__dirname, '/'),
    },

    routeRules: {
        '/': { redirect: '/en' },
    },

    modules: [
        '@nuxt/eslint',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@nuxtjs/html-validator',
    ],

    typescript: {
        typeCheck: true,
        strict: true,
        shim: true, // Generate a *.vue shim. (recommended to false, maybe needed true for ESLint)
        tsConfig: {
            compilerOptions: {
                lib: ['esnext', 'esnext.asynciterable', 'dom', 'dom.iterable'],
                incremental: true,
                sourceMap: true,
            }
        },
    },

    tailwindcss: {
        cssPath: ['~/assets/scss/tailwind.scss', { injectPosition: 'first' }],
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
                    colors: {
                        skin: {
                            'base': customColorWithAlpha('--color-text-base'),
                            'inverted': customColorWithAlpha('--color-text-inverted'),
                            'fill': customColorWithAlpha('--color-fill'),
                            'fill-inverted': customColorWithAlpha('--color-fill-inverted'),
                            'gradient': customColorWithAlpha('--color-fill'),
                        },
                    },
                    textColor: {
                        skin: {
                            base: customColorWithAlpha('--color-text-base'),
                            inverted: customColorWithAlpha('--color-text-inverted'),
                        },
                    },
                    backgroundColor: {
                        skin: {
                            'fill': customColorWithAlpha('--color-fill'),
                            'fill-inverted': customColorWithAlpha('--color-fill-inverted'),
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
            plugins: [],
        },
    },

    css: [],

    colorMode: {
        classSuffix: '',
    },

    // TODO: config i18n for SS-translations and SEO at https://i18n.nuxtjs.org/docs/guide/server-side-translations and https://i18n.nuxtjs.org/docs/guide/seo
    i18n: {
        baseUrl: 'http://localhost:3000/',
        strategy: 'prefix_and_default',
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'en',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // recommended
        },
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en-US.json',
            },
            {
                code: 'es',
                iso: 'es-ES',
                file: 'es-ES.json',
            },
        ],
        experimental: {
            localeDetector: './composables/localeDetector.ts',
        },
    },

});
