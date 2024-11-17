<template>
  <div class="preview-container">

    <h2 class="preview-title">Preview</h2>

    <div class="mobile mobile-preview" :class="store.template.language === 'ar_SA' ? 'direction-rtl' : ''">
      <div class="mobile-header overflow-hidden">
        <img src="/src/assets/images/mobile-header.svg" alt="mobile header">
      </div>
      <div class="mobile-buttons">
        <span /><span />
      </div>
      <div v-if="1" class="message-container">

        <div class="message-area message-bubble"
          :style="{ direction: store.template.language === 'ar_SA' ? 'rtl' : '' }">
          <div class="message-body">
            <img
              v-show="store.getTemplateMessage.headerType == 'IMAGE' && store.getTemplateMessage.headerImageUrl?.includes('http')"
              :src="store.getTemplateMessage.headerImageUrl" width="290" height="200" style="object-fit: cover;"
              class="img--thumbnail preview rounded w-100 mb-2" />


            <h2 v-show="store.getTemplateMessage.headerType == 'TEXT'" class="message-header text-capitalize fs-6">{{
              store.getTemplateMessage.headerText }}</h2>
            <div class="message-text">

              <div v-if="store.getTemplateMessage.bodyText">
                <p v-for="(line, lineIndex) in store.getTemplateMessage.bodyText?.split('\n')" :key="lineIndex"
                  class="mb-2">{{ line }}
                </p>
              </div>
              <div v-else>
                Your message will appear here
              </div>
            </div>

            <div class="message-footer">
              <span class="powered-by">{{ store.getTemplateMessage.footerText || 'Powered by arabot' }} </span>
              <span class="message-time">14:05 PM</span>
            </div>


            <div v-if="store.getButtonsStatus == 'true'" class="message-buttons">
              <ul class="list-unstyled px-0 mb-0">
                <li v-for="(btn, btnIndex) in store.getTemplateMessage.buttons" :key="btnIndex">
                  <a v-if="btn.buttonActionType === 'URL' && btn.buttonValue.url?.length && btn.buttonText?.length"
                    :href="btn.buttonValue.url" target="_blank" class="message-button">
                    <img src="/src/assets/images/link.svg" width="12" height=" 12" alt="link">
                    {{ btn.buttonText }}
                  </a>
                  <a v-if="btn.buttonActionType === 'CALL' && btn.buttonValue.phone_number?.length && btn.buttonText?.length"
                    :href="`callto: ${btn.buttonValue.countryCode + btn.buttonValue.phone_number}`" target="_blank"
                    class="message-button">
                    <img src="/src/assets/images/phone.svg" width="12" height=" 12" alt="number">
                    {{ btn.buttonText }}
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>

      <!-- <pre> {{ store.getTemplateMessage.buttons }}</pre> -->
      <div class="message-input " />
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

const buttonType = ref('')
buttonType.value = computed(() => store.buttonType)

// onMounted(() => {  message.value = store.getTemplateMessage; }) 
// const isRTL = computed(() => props.language === 'ar_SA');

</script>

<style scoped>
.template-preview {
  max-width: 400px;
  margin: 0 auto;
}



.rtl {
  direction: rtl;
  text-align: right;
}
</style>
