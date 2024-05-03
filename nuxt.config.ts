// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';
import { fontSize } from 'tailwindcss/defaultTheme';
import type { DefaultTheme } from 'tailwindcss/types/generated/default-theme';

function twRgbFromHex(color: string) {
    return `rgb(from var(${color}) r g b / <alpha-value>)`;
}

function getResponsiveFontSize(size: string): string {
    const sizeValue = parseFloat(size);
    return `clamp(${sizeValue}rem, 1.5vw, ${sizeValue * 2}rem)`;
}

type FontSizeRecord = DefaultTheme['fontSize'];
const responsiveFontSize: FontSizeRecord = { ...fontSize };
Object.entries(responsiveFontSize).forEach(([key, value]) => {
    const [size, lineHeight] = value;
    responsiveFontSize[key as keyof FontSizeRecord] = [
        getResponsiveFontSize(size),
        lineHeight,
    ];
});

export default defineNuxtConfig({
    app: {
        head: {
            title: 'portfolio-nuxt-tailwindcss-typescript',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { hid: 'description', name: 'description', content: '' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            htmlAttrs: {
                lang: 'en',
            },
            noscript: [{ children: 'JavaScript is required' }],
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
        '@nuxt/fonts',
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
            },
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
                    backgroundColor: {
                        skin: {
                            fill: twRgbFromHex('--color-fill'),
                            'fill-inverted': twRgbFromHex(
                                '--color-fill-inverted',
                            ),
                        },
                    },
                    colors: {
                        skin: {
                            base: twRgbFromHex('--color-text-base'),
                            inverted: twRgbFromHex('--color-text-inverted'),
                            fill: twRgbFromHex('--color-fill'),
                            'fill-inverted': twRgbFromHex(
                                '--color-fill-inverted',
                            ),
                            gradient: twRgbFromHex('--color-fill'),
                        },
                    },
                    fontSize: {
                        ...responsiveFontSize,
                    },
                    gradientColorStops: {
                        skin: {
                            hue: twRgbFromHex('--color-fill'),
                        },
                    },
                    textColor: {
                        skin: {
                            base: twRgbFromHex('--color-text-base'),
                            inverted: twRgbFromHex('--color-text-inverted'),
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
