<script setup>
// https://iamstevendao.github.io/vue-tel-input/guide/getting-started.html
import { ref } from "vue";
import { VueTelInput } from "vue-tel-input";
import 'vue-tel-input/vue-tel-input.css';
import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();


const { theComponent } = defineProps(['theComponent']);
//define emits

const emit = defineEmits(['updateImage']);
function handleFileUploader(e) {
    emit('updateImage', e)
}
</script>

<template>
    <div class="position-relative has-validation">
        <div class="image-upload d-flex flex-column align-items-center"
            :class="{ 'is-invalid border-danger': store.formErrors.headerImageEmpty  && !theComponent.value.url.includes('http') }">

            <div v-if="theComponent.value.url && theComponent.value.url.length && theComponent.value.url.includes('http')"
                class="m-auto w-100 d-flex justify-content-between align-items-center flex-column flex-md-row">
                <img :src="theComponent.value.url" height="200" class="img-thumbnail preview" alt="Uploaded Image" />


                <div class="w-100 py-4 text-center">
                    <button class="btn btn-outline-primary" type="button"> {{ $t('header.imageUpload.replaceInput')
                        }}</button>
                    <label for="file" class="visually-hidden"> {{ $t('header.imageUpload.replaceInput') }}</label>
                    <input type="file" id="uploadFile2" style="opacity: 0; cursor:pointer; width: 0; height: 0;"
                        class="upload-input d-block stretched-link" @change="handleFileUploader"
                        accept="image/jpeg, image/jpg, image/png" />
                </div>
            </div>

            <!-- theComponent.value.url < 5 && -->
            <div v-else>
                <div class="upload-content text-center">
                    <img src="/src/assets/images/upload.svg" alt="upload icon" width="36" height="36" class=" mb-3" />
                    <p class="upload-description mb-2">
                        {{ $t('header.imageUpload.description') }}
                        <span class="upload-browse"> {{ $t('header.imageUpload.browse') }} </span>
                    </p>
                    <small class="upload-file-types d-block mb-3"> {{ $t('header.imageUpload.types') }} </small>
                    <button type="button" class="upload-button"> {{ $t('header.imageUpload.selectInput') }}</button>
                </div>

                <input type="file" id="uploadFile" style="opacity: 0;  cursor:pointer"
                    class="upload-input h-100 position-absolute start-0 top-0 w-100" @change="handleFileUploader"
                    accept="image/jpeg, image/jpg, image/png" />
            </div>
        </div>

        
        <div class="invalid-tooltip" style="margin-top: 5px;">  {{ $t('header.imageUpload.error') }}</div>
    </div>
</template>