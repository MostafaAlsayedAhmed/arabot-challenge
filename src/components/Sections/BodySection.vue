<template>

  <section class="form-section body-section">
    <h2 class="section-title">Body </h2>
    <p class="section-description">
      Enter the text of your message in the language you've selected
    </p>
    <div class="form-group section-content">
      <label for="bodyText" class="visually-hidden">Body Text </label>
      <textarea id="bodyText" v-model="theComponent.text" style="height:105px" class="form-textarea" rows="4" required
        aria-required="true" placeholder="Main content of the message. e.g. 'Welcome to our service!'"></textarea>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

const theComponent = ref({
  "type": "BODY", "text": "Your message will appear here"
})

const bodyText = ref("");

onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'BODY')
  // console.log("BODY: ", theComponent.value);
})


</script>