<template>
    <header class="app-header position-relative d-flex justify-content-between align-items-center gap-2 bg-white "
        style="z-index: 1;">
        <div class="logo-container d-flex align-items-center">
            <img width="18" height="18" src="/src/assets/images/plus.svg" alt="plus">
            <h1 class="app-title mb-1">{{ pageTitle }}</h1>
        </div>

        <SaveButton marginClass="" />
    </header>
</template>

<script setup>
import SaveButton from '@/components/Buttons/SaveButton.vue';

const { pageTitle } = defineProps(['pageTitle']) 
</script>