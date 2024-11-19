<template>
  <section class="form-section footer-section">
    <h2 class="section-title">{{ $t('footer.title') }}</h2>
    <p class="section-description">{{ $t('footer.description') }} </p>

    <div class="form-group section-content">
      <label for="footerText" class="visually-hidden">{{ $t('footer.title') }}</label>
      <input id="footerText" v-model="theComponent.text" type="text" class="form-input"
        :placeholder="$t('footer.help')" />
    </div>
  </section>

</template>


<script setup>
import { computed } from 'vue';
import { useTemplateStore } from '@/stores/templateStore'; 
const store = useTemplateStore();
  
const theComponent = computed(() =>
  store.template.components?.find(component => component.type === 'FOOTER') || {}   
);
</script>