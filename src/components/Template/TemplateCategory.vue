<template>
    <CustomSelector :options="store.getCategories">
        <template v-slot:title> {{ $t('category.title') }}</template>
        <template v-slot:description> {{ $t('category.description') }}</template>
    </CustomSelector>
</template>

<script setup>
import CustomSelector from '@/components/FormElements/CustomSelector.vue'; 
import { useTemplateStore } from '@/stores/templateStore'; 
const store = useTemplateStore(); 
</script>