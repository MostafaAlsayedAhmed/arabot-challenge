<template>
  <section class="form-section header-section">
    <h2 class="section-title">{{ $t('header.title') }}</h2>
    <p class="section-description"> {{ $t('header.description') }} </p>

    <div class="section-content" v-if="theComponent">

      <!-- Tabs Section -->
      <div class="header-options p-1">
        <template v-for="option in ['NONE', 'TEXT', 'IMAGE']" :key="option">
          <label class="header-option option" :class="{ active: theComponent.format == option.toUpperCase() }">
            <input type="radio" v-model="theComponent.format" :value="option.toUpperCase()" class="visually-hidden" />

            <img v-if="option !== 'NONE'" width="16" height="16" alt="image option-icon"
              :src="`/assets/images/${option.toLowerCase()}.svg`" />

            <span class="option-text">{{ $t(`header.options.${option.toLowerCase()}`) }}</span>
          </label>
        </template>
      </div>

      <!-- headerText & FileUploader Section -->
      <div v-if="theComponent.format === 'TEXT'" class="form-group has-validation position-relative">
        <label for="headerText" class="form-label"> {{ $t('header.options.text') }} <span
            class="required-asterisk">*</span></label>
        <input id="headerText" v-model="headerText" @input="updateHeaderText" type="text" class="form-input"
          :class="{ 'is-invalid border-danger': headerText?.length < 5 && store.formErrors.headerTextEmpty }"
          :placeholder="$t('header.textHelp')" required />

        <div class="invalid-tooltip">{{ $t('header.textError') }} </div>
      </div>

      <FileUploader v-if="theComponent.format === 'IMAGE'" :theComponent="theComponent"
        @updateImage="updateHeaderImage" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTemplateStore } from '@/stores/templateStore';
import FileUploader from '@/components/FormElements/FileUploader.vue';
const store = useTemplateStore();

const theComponent = computed(() =>
  store.template.components?.find(component => component.type === 'HEADER') || {}
);
const headerImage = ref('');
const headerText = ref(theComponent.value.format == "TEXT" ? theComponent.value?.text : "")


function updateHeaderText(e) {
  const value = e.target.value;
  theComponent.value.value = { "text": value };
}

function updateHeaderImage(e) {
  const value = e.target.value;
  const file = event.target.files[0];

  if (file) {
    headerImage.value = URL.createObjectURL(file); // Generate a local preview URL
    theComponent.value.value = { "url": headerImage.value };
  } else {
    headerImage.value = null;
  }
}  
</script>

<style scoped>
.img-thumbnail {
  object-fit: cover;
  width: 300px;
  height: 200px;
}
</style>