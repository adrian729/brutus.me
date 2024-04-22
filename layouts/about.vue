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

const title = computed(() => t('layouts.title', { title: t(route.meta.title ?? 'TBD') }));

useHead({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs?.lang,
        dir: i18nHead.value.htmlAttrs?.dir,
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])],
    title: () => title.value,
    ogTitle: () => title.value,
})

const gradientBg = ref(null);

onMounted(() => {
    setGradientPosition();
});

function moveGradient(event) {
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    // console.log('event', event);
    let x = 0;
    let y = 0;

    let moveEvent = event;
    if (event.type == 'touchmove') {
        moveEvent = event.touches[0] || event.changedTouches[0] || event.originalEvent?.touches[0] || event.originalEvent?.changedTouches[0];
    }

    x = Math.round(100 * moveEvent.pageX / wWidth);
    y = Math.round(100 * moveEvent.pageY / wHeight);

    if (gradientBg.value) {
        setGradientPosition(x, y);
    }
}

function setGradientPosition(x = 0, y = 0) {
    if (gradientBg.value) {
        gradientBg.value.style.setProperty('--position-x', `${x}%`);
        gradientBg.value.style.setProperty('--position-y', `${y}%`);
    }
}
</script>

<template>
    <div class="text-skin-base">
        <header class="fixed w-full h-16 z-50 flex justify-end">
            <ColorMode />
        </header>
        <div class="absolute w-full h-screen bg-skin-fill-inverted -z-10"/>
        <div
ref="gradientBg" :style="{
                backgroundBlendMode: 'normal',
                backgroundImage: `linear-gradient(134deg, ${customColorWithAlpha('--color-fill', 0.7)} 75%, transparent), radial-gradient(at var(--position-x) var(--position-y), ${customColorWithAlpha('--color-text-inverted', 0.9)} 0%, transparent 15%), url(/svg/bg-grainy.svg);`
            }" class="h-screen pt-16 contrast-[510%] brightness-100 bg-fixed" @mousemove.prevent="moveGradient"
            @touchmove="moveGradient">
            <div class="w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 xl:w-1/3 mx-auto">
                <slot />
            </div>
        </div>
    </div>
</template>
