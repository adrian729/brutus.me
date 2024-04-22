<script setup>
const colorMode = useColorMode();
</script>

<template>
    <div>
        <p class="p-4 pb-2 text-skin-base">
            <select
                v-model="colorMode.preference"
                class="border w-24 h-8 bg-skin-fill/60"
            >
                <option value="system">
                    System
                </option>
                <option value="light">
                    Light
                </option>
                <option value="dark">
                    Dark
                </option>
                <option value="sepia">
                    Sepia
                </option>
                <option value="swiss">
                    Swiss
                </option>
                <option value="neon">
                    Neon
                </option>
            </select>
        </p>
    </div>
</template>
