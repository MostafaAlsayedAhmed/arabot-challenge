<template>


  <section class="form-section footer-section">
    <h2 class="section-title">Footer</h2>
    <p class="section-description">
      Use this section for optional details like disclaimers, contact info, or additional context.
    </p>
    <div class="form-group section-content">
      <label for="footerText" class="visually-hidden">Footer Text</label>
      <input id="footerText" v-model="theComponent.text" type="text" class="form-input"
        placeholder="Footer text, such as disclaimers or additional notes. e.g. 'Terms and conditions apply.'" />
    </div>
  </section>

</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue';

import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

const theComponent = ref({
  "type": "FOOTER", "text": "Powered by arabot"
})

const footerText = ref("");

onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'FOOTER')
  // console.log("FOOTER: ", theComponent.value);
})


</script>