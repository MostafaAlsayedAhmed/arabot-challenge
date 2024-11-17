<template>
    <!-- TODO: in case there are are different pages, 
     we can get them from url for example and list them instead of "Templates" -->
    <nav class="breadcrumb d-flex align-items-center">
        <span class="breadcrumb-item">Templates</span>
        <img width="16" height="16" src="/src/assets/images/arrow.svg" alt="arrow" />
        <strong class="breadcrumb-item">{{ pageTitle }}</strong>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
const { pageTitle } = defineProps(['pageTitle']) 
</script>