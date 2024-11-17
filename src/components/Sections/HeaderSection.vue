<template>

  <section class="form-section header-section">
    <h2 class="section-title">Header</h2>
    <p class="section-description">
      Highlight your brand here, use images or videos, to stand out
    </p>

    <div class="section-content" v-if="theComponent.format">
      <div class="header-options p-1">
        <label class="header-option option" :class="{ active: theComponent?.format == `NONE` }">
          <input type="radio" v-model="theComponent.format" value="NONE" class="visually-hidden" />
          <span class="option-text">None</span>
        </label>
        <label class="header-option option" :class="{ active: theComponent.format == `TEXT` }">
          <input type="radio" v-model="theComponent.format" value="TEXT" class="visually-hidden" />

          <img width="16" height="16" src="/src/assets/images/text.svg" alt="text option-icon" />

          <span class="option-text">Text</span>
        </label>
        <label class="header-option option" :class="{ active: theComponent.format == `IMAGE` }">
          <input type="radio" v-model="theComponent.format" value="IMAGE" class="visually-hidden" />
          <img width="16" height="16" src="/src/assets/images/image.svg" alt="image option-icon" />

          <span class="option-text">Image</span>
        </label>
      </div>

      <div v-if="theComponent.format === 'TEXT'" class="form-group">
        <label for="headerText" class="form-label"> Text <span class="required-asterisk">*</span></label>
        <input id="headerText" v-model="headerText" @input="updateHeaderText" type="text" class="form-input" required />
      </div>

      <div v-if="theComponent.format === 'IMAGE'"
        class="image-upload d-flex flex-column align-items-center position-relative">

        <div v-if="theComponent.value.url && theComponent.value.url.length && theComponent.value.url.includes('http')"
          class="m-auto w-100 d-flex justify-content-between align-items-center flex-column flex-md-row">
          <img :src="theComponent.value.url" height="200" class="img-thumbnail preview" alt="Uploaded Image" />


          <div class="w-100 py-4 text-center">
            <label for="file">Replace the image</label>
            <input type="file" id="uploadFile2" style="opacity: 0.5; cursor:pointer; max-width: 107px;"
              class="upload-input mx-auto mt-3 d-block" @change="updateHeaderImage"
              accept="image/jpeg, image/jpg, image/png" /> 
          </div>
        </div>

        <div v-else>
          <div class="upload-content text-center">
            <img src="/src/assets/images/upload.svg" alt="upload icon" width="36" height="36" class=" mb-3" />
            <p class="upload-description mb-2">
              Drag and drop file here to upload or
              <span class="upload-browse">Browse</span>
            </p>
            <small class="upload-file-types  d-block mb-3">Allowed types .jpeg, .jpg, .png</small>
            <button type="button" class="upload-button">Select file</button>
          </div>

          <input type="file" id="uploadFile" style="opacity: 0;  cursor:pointer"
            class="upload-input h-100 position-absolute start-0 top-0 w-100" @change="updateHeaderImage"
            accept="image/jpeg, image/jpg, image/png" />

        </div>
      </div>
    </div>
  </section>


</template>

<script setup>
import { ref, reactive, watch, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTemplateStore } from '@/stores/templateStore';
const { t } = useI18n({ useScope: 'global' })
const store = useTemplateStore();


const theComponent = ref({
  "type": "HEADER", "format": "", "value": ""
})

const imageUrl = ref('');
const headerText = ref(theComponent.value?.text || "")

onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'HEADER')
  // console.log("FOOTER: ", theComponent.value);

})

//  watch theComponent
watch(() => theComponent.value, (newVal) => {
  // console.log('component change', newVal);
  theComponent.value = store.template.components?.find(component => component.type == 'HEADER')
});


function updateHeaderText(e) {
  const value = e.target.value;

  // console.log('update', value);
  theComponent.value.value = { "text": value };
}

function updateHeaderImage(e) {
  const value = e.target.value;
  const file = event.target.files[0];

  if (file) {
    imageUrl.value = URL.createObjectURL(file); // Generate a local preview URL
    theComponent.value.value = { "url": imageUrl.value };

  } else {
    imageUrl.value = null; // Reset if no file is selected
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