<template>

  <section class="form-section" style="direction: ltr !important;">
    <h2 class="section-title">Template Details</h2>
    <p class="section-description">Define your template name and language</p>

    <div class="section-content">
      <div class="form-group">
        <label for="templateName" class="form-label">
          Template Name
          <span class="required-asterisk">*</span>
        </label>
        <input id="templateName" v-model="store.template.name" @input="generateIdentifier" type="text"
          class="form-input" required aria-required="true" placeholder="Template Name" />
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
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTemplateStore } from '@/stores/templateStore';
const { t, locale } = useI18n({ useScope: 'global' })
const store = useTemplateStore();


function generateIdentifier() { 
  let name = store.template.name;
  // Convert to lowercase and replace spaces with underscores
  store.template.name = name.toLowerCase().replace(/ /g, '_');
}

watch(
  () => store.template.language,
  (language) => {
    locale.value = language
  }
)
</script>