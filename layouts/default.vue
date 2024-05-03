<script setup lang="ts">
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
</script>

<template>
    <div>
        <div class="mx-auto w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 xl:w-1/3">
            <slot />
        </div>
    </div>
</template>
