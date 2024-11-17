<template>
    <CustomSelector :options="store.getCategories">
        <template v-slot:title> {{ t('category.title') }}</template>
        <template v-slot:description> {{ t('category.description') }}</template>
    </CustomSelector>
</template>

<script setup>
import CustomSelector from '@/components/FormElements/CustomSelector.vue';
import { useI18n } from 'vue-i18n'
import { useTemplateStore } from '@/stores/templateStore';
const { t } = useI18n({ useScope: 'global' })
const store = useTemplateStore();

</script>