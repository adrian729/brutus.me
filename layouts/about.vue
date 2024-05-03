<script setup lang="ts">
import { onMounted } from 'vue';
import { customColorWithAlpha } from '~/utils/colors';

const { t } = useI18n();
const route = useRoute();
const i18nHead = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
});

const title = computed(() => {
    let routeMetaTitle = 'TBD';
    if (
        typeof route.meta.title === 'string' ||
        route.meta.title instanceof String
    ) {
        routeMetaTitle = route.meta.title.toString();
    }
    return t('layouts.title', { title: t(routeMetaTitle) });
});
useHead({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs?.lang,
        dir: i18nHead.value.htmlAttrs?.dir,
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])],
    title: () => title.value,
});

const gradientBg = ref<HTMLDivElement | null>(null);

onMounted(() => {
    setGradientPosition();
});

// function onGradientTouchMove(event: TouchEvent) {
//     if (event.type !== 'touchmove') {
//         return;
//     }
//     const touch = event.touches[0] || event.changedTouches[0];
//     setGradientPosition(touch.pageX, touch.pageY);
// }

// function onGradientMouseMove(event: MouseEvent) {
//     if (event.type !== 'mousemove') {
//         return;
//     }
//     setGradientPosition(event.pageX, event.pageY);
// }

function setGradientPosition(x: number = 0, y: number = 0) {
    if (gradientBg.value) {
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;
        const posX = Math.round((100 * x) / wWidth);
        const posY = Math.round((100 * y) / wHeight);

        gradientBg.value.style.setProperty('--position-x', `${posX}%`);
        gradientBg.value.style.setProperty('--position-y', `${posY}%`);
    }
}
</script>

<template>
    <div class="text-skin-base font-mono">
        <header class="fixed z-50 flex h-16 w-full justify-end">
            <ColorMode />
        </header>
        <div class="bg-skin-fill-inverted absolute -z-10 h-screen w-full" />
        <div
ref="gradientBg" :style="{
            backgroundBlendMode: 'normal',
            backgroundImage: `linear-gradient(134deg, ${customColorWithAlpha('--color-fill', 0.7)} 75%, transparent), radial-gradient(at var(--position-x) var(--position-y), ${customColorWithAlpha('--color-text-inverted', 0.8)} 0%, transparent 15%), url(/svg/bg-grainy.svg);`,
        }" class="h-screen bg-fixed pt-16 brightness-100 contrast-[510%]">
            <div class="mx-auto w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 xl:w-1/3">
                <slot />
                <div class="relative h-72 w-72">
                    <div class="absolute flex h-full w-full justify-around">
                        <div class="border-skin-base vertical-anim-line w-[1px] border-l-2 border-dashed" />
                        <div class="border-skin-base vertical-anim-line w-[1px] border-l-2 border-dashed" />
                        <div class="border-skin-base vertical-anim-line w-[1px] border-l-2 border-dashed" />
                        <div class="border-skin-base vertical-anim-line w-[1px] border-l-2 border-dashed" />
                    </div>
                    <div class="absolute flex h-full w-full flex-col justify-around">
                        <div class="border-skin-base horizontal-anim-line h-[1px] border-t-2 border-dashed" />
                        <div class="border-skin-base horizontal-anim-line h-[1px] border-t-2 border-dashed" />
                        <div class="border-skin-base horizontal-anim-line h-[1px] border-t-2 border-dashed" />
                        <div class="border-skin-base horizontal-anim-line h-[1px] border-t-2 border-dashed" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.vertical-anim-line {
    height: 0px;
    animation: anim-height 2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    animation-delay: 0.5s;
}

.horizontal-anim-line {
    width: 0px;
    animation: anim-width 2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    animation-delay: 0.5s;
}

@keyframes anim-height {
    0% {
        opacity: 0.8;
    }

    to {
        height: 100%;
        opacity: 0.4;
    }
}

@keyframes anim-width {
    0% {
        opacity: 0.8;
    }

    to {
        width: 100%;
        opacity: 0.4;
    }
}
</style>
