<script setup>
definePageMeta({
    title: 'pages.title.top', // set resource key
});

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value);
});
</script>

<template>
    <div>
        <p>{{ t('pages.top.description') }}</p>
        <p>{{ t('pages.top.languages') }}</p>
        <nav>
            <template v-for="(_locale, index) in availableLocales" :key="_locale.code">
                <span v-if="index"> | </span>
                <NuxtLink :to="switchLocalePath(_locale.code)">
                    {{ _locale.name ?? _locale.code }}
                </NuxtLink>
            </template>
        </nav>
    </div>
</template>
