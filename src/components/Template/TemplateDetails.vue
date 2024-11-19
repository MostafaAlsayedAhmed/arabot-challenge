<template>

  <section class="form-section" style="direction: ltr !important;">
    <h2 class="section-title">Template Details</h2>
    <p class="section-description">Define your template name and language</p>

    <div class="section-content">
      <div class="form-group has-validation position-relative">
        <label for="templateName" class="form-label">
          Template Name
          <span class="required-asterisk">*</span>
        </label>
        <input id="templateName" v-model="templateName" @input="generateIdentifier" @blur="hideNameReachedLimitHint"
          class="form-input"
          :class="{ 'is-invalid border-danger': templateName.length < 5 && store.formErrors.templateNameEmpty }"
          @keydown.enter.prevent type="text" required aria-required="true"
          placeholder="template_name (5-20 characters)" />

        <div :class="{ 'd-block': nameReachedLimit }" class="invalid-tooltip">
          {{ templateName.length < 5 && store.formErrors.templateNameEmpty
            ? 'The template name is required (Min 5 characters)' : 'Maximum 20 characters' }} </div>

        </div>
        <div class="form-group">
          <label for="language" class="form-label">
            Language
            <span class="required-asterisk">*</span>
          </label>
          <div class="select-wrapper locale-changer position-relative">
            <select id="language" v-model="store.template.language" class="form-select" required aria-required="true">
              <option value="" disabled>Select Language</option>
              <option value="en_US">English </option>
              <option value="ar_SA">Arabic</option>
            </select>
          </div>
        </div>

      </div>
  </section>

</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';

import { useI18n } from 'vue-i18n';
import { useTemplateStore } from '@/stores/templateStore';
const { t, locale } = useI18n({ useScope: 'global' })
const store = useTemplateStore();

const templateName = ref('');
const nameReachedLimit = ref(false);

onMounted(async () => {
  await nextTick();
  templateName.value = store.getTemplateName;
});

function generateIdentifier() {
  // Replace spaces with underscores and limit characters to 20
  nameReachedLimit.value = (templateName.value?.length > 20) ? true : false;

  if (templateName.value?.length <= 20) {
    templateName.value = templateName.value.toLowerCase().replace(/ /g, '_');
    store.setName(templateName.value);
  } else {
    templateName.value = templateName.value.substring(0, 20).toLowerCase().replace(/ /g, '_');
  }
}

const hideNameReachedLimitHint = () => {
  nameReachedLimit.value = false;
};

watch(
  () => store.template.language,
  (language) => locale.value = language
)
</script>

<style scoped>
.invalid-tooltip {
  inset-inline-end: 0;
}
</style>