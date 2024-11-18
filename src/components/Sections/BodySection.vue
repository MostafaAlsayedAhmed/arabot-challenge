<template>
  <section class="form-section body-section">
    <h2 class="section-title">{{ $t('body.title') }} </h2>
    <p class="section-description">{{ $t('body.description') }} </p>


    <div class="form-group section-content">
      <label for="bodyText" class="visually-hidden"> {{ $t('body.description') }} </label>
      <textarea id="bodyText" v-model="theComponent.text" style="height:105px" class="form-textarea" rows="4" required
        aria-required="true" :placeholder="$t('body.help')"></textarea>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useTemplateStore } from '@/stores/templateStore';

const store = useTemplateStore();
const theComponent = ref({ "type": "BODY", "text": "Your message will appear here" })
const bodyText = ref("");

onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'BODY')
  // console.log("BODY: ", theComponent.value);
})


</script>