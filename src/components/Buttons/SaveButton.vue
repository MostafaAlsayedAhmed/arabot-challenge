<template>
    <button class="primary-button save-button d-flex align-items-center transition" :class="marginClass" @click.prevent="store.saveTemplate">
        <img width="16" src="/src/assets/images/save.svg" alt="save-icon"> Save 
    </button>
</template>

<script setup>
import { ref } from 'vue';
const { marginClass } = defineProps(['marginClass']);

import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

</script>