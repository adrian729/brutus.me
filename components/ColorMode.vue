<script setup>
const colorMode = useColorMode();
</script>

<template>
    <div>
        <p class="text-skin-base p-4 pb-2">
            <label for="color-mode" class="mr-2"> Color Mode </label>
            <select
                id="color-mode"
                v-model="colorMode.preference"
                class="bg-skin-fill/60 h-8 w-24 border"
            >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="sepia">Sepia</option>
                <option value="swiss">Swiss</option>
                <option value="neon">Neon</option>
            </select>
        </p>
    </div>
</template>
