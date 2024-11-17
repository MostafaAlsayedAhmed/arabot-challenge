<template>
  <div class="template-message-app" :class="{ 'smallScreen': isSmallScreen }">
    <!-- isSmallScreen:  {{ isSmallScreen }} -->
    <TemplateHeader :pageTitle="currentPageTitle" />
    <BreadcrumbNav :pageTitle="currentPageTitle" />

    <div class="container-fluid ps-0">
      <div class="row">
        <div class="col-lg-8">

          <main class="main-content" :class="store.template.language === 'ar_SA' ? 'direction-rtl' : ''">
            <div class="template-form-container">
              <form class="template-form">
                <TemplateDetails />
                <TemplateCategory />

                <!-- FormSections -->
                <div class="form-section">
                  <HeaderSection />
                  <BodySection />
                  <FooterSection />
                  <ButtonsSection />
                </div>
                <!-- FormSections -->

              </form>
            </div>

            <button v-if="isSmallScreen" @click="showPreviewMobile = !showPreviewMobile"
              class="preview-mobile-btn   d-block d-lg-none transition">
              {{ showPreviewMobile ? 'Show' : 'Hide' }} <br> Preview
            </button>

          </main>
        </div>

        <div v-if="!showPreviewMobile" class="col-lg-4">
          <aside class="preview-area position-relative">
            <TemplateUiPreview />
          </aside>
        </div>

        <div class="col-lg-8 mb-5">
          <SaveButton :marginClass="store.template.language === 'ar_SA' ? 'me-4 ms-auto' : 'ms-4 me-auto'" />
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useTemplateStore } from '@/stores/templateStore';
import { ref, reactive, watch, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'



import BreadcrumbNav from '@/components/Layout/BreadcrumbNav.vue';
import TemplateHeader from '@/components/Layout/TemplateHeader.vue';

import TemplateDetails from '@/components/Template/TemplateDetails.vue';
import TemplateCategory from '@/components/Template/TemplateCategory.vue';
import TemplateUiPreview from '@/components/Template/TemplateUiPreview.vue';


import HeaderSection from '@/components/Sections/HeaderSection.vue';
import BodySection from '@/components/Sections/BodySection.vue';
import FooterSection from '@/components/Sections/FooterSection.vue';
import ButtonsSection from '@/components/Sections/ButtonsSection.vue';


import SaveButton from '@/components/Buttons/SaveButton.vue';


const store = useTemplateStore();
const isSmallScreen = ref(false);
const showPreviewMobile = ref(false);
const currentPageTitle = "New Template Message"


const checkWindowSize = () => {
  if (window.innerWidth < 992) {
    isSmallScreen.value = true;
    showPreviewMobile.value = true;
  } else {
    isSmallScreen.value = false;
    showPreviewMobile.value = false;
  }
  // console.log("isSmallScreen", isSmallScreen.value, window.innerWidth);
}

onMounted(async () => {
  await store.loadTemplate();
  if (store.template.category) store.selectCategory(store.template.category);

  checkWindowSize() // For Small Screens 
  //  Add event listener to handle window resize
  window.addEventListener("resize", checkWindowSize);
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize); // Clean up the event listener 
}) 
</script>


<style lang="scss">
.direction-rtl {
  direction: rtl;

  .preview-mobile-btn {
    left: 30px;
    right: unset;
  }
}

.preview-mobile-btn {
  position: fixed;
  right: 30px;
  bottom: 40px;
  z-index: 5;
  width: 85px;
  height: 60px;
  border-radius: 10px;
  background: #9b7cb7 !important;
  color: #fff !important;
  border: 0;

  &:hover {
    background: #b395cd !important;
  }
}

.smallScreen {
  .preview-area {
    .preview-title {
      display: none;
    }
  }
}
</style>