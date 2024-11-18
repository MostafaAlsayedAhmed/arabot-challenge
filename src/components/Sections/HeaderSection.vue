<template>
  <section class="form-section header-section">
    <h2 class="section-title">{{ $t('header.title') }}</h2>
    <p class="section-description"> {{ $t('header.description') }} </p>

    <div class="section-content" v-if="theComponent.format">

      <div class="header-options p-1">
        <label class="header-option option" :class="{ active: theComponent.format == `NONE` }">
          <input type="radio" v-model="theComponent.format" value="NONE" class="visually-hidden" />
          <span class="option-text">{{ $t('header.options.none') }}</span>
        </label>
        <label class="header-option option" :class="{ active: theComponent.format == `TEXT` }">
          <input type="radio" v-model="theComponent.format" value="TEXT" class="visually-hidden" />

          <img width="16" height="16" src="/src/assets/images/text.svg" alt="text option-icon" />

          <span class="option-text">{{ $t('header.options.text') }}</span>
        </label>
        <label class="header-option option" :class="{ active: theComponent.format == `IMAGE` }">
          <input type="radio" v-model="theComponent.format" value="IMAGE" class="visually-hidden" />
          <img width="16" height="16" src="/src/assets/images/image.svg" alt="image option-icon" />

          <span class="option-text">{{ $t('header.options.image') }}</span>
        </label>
      </div>

      <div v-if="theComponent.format === 'TEXT'" class="form-group">
        <label for="headerText" class="form-label"> {{ $t('header.options.text') }} <span
            class="required-asterisk">*</span></label>
        <input id="headerText" v-model="headerText" @input="updateHeaderText" type="text" class="form-input"
          :placeholder="t('header.textHelp')" required />
      </div>

      <FileUploader v-if="theComponent.format === 'IMAGE'" :theComponent="theComponent"
        @updateImage="updateHeaderImage" />
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'; 
import { useTemplateStore } from '@/stores/templateStore'; 
import FileUploader from '@/components/FormElements/FileUploader.vue';
const store = useTemplateStore(); 
 
const theComponent = ref({ "type": "HEADER", "format": "", "value": "" })

const imageUrl = ref('');
const headerText = ref(theComponent.value?.text || "")

onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'HEADER')
  // console.log("FOOTER: ", theComponent.value); 
})

watch(() => theComponent.value, (newVal) => {
  // console.log('component change', newVal);
  theComponent.value = store.template.components?.find(component => component.type == 'HEADER')
});


function updateHeaderText(e) {
  const value = e.target.value; // console.log('update', value);
  theComponent.value.value = { "text": value };
}

function updateHeaderImage(e) {
  const value = e.target.value;
  const file = event.target.files[0];

  if (file) {
    imageUrl.value = URL.createObjectURL(file); // Generate a local preview URL
    theComponent.value.value = { "url": imageUrl.value }; 
  } else {
    imageUrl.value = null; // if no file is selected
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