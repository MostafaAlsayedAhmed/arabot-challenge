<template>
  <section class="form-section body-section">
    <h2 class="section-title">{{ $t('body.title') }} </h2>
    <p class="section-description">{{ $t('body.description') }} </p>


    <div class="form-group section-content has-validation position-relative">
      <label for="bodyText" class="visually-hidden"> {{ $t('body.description') }} </label>
      <textarea id="bodyText" v-model="theComponent.text" style="height:105px" rows="4" required aria-required="true"
        :placeholder="$t('body.help')" class="form-textarea"
        :class="{ 'is-invalid border-danger': theComponent.text.length < 5 && store.formErrors.bodyTextEmpty }"></textarea>

      <div class="invalid-tooltip" style="margin-top: -25px;"> {{ $t('body.error') }} </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

const theComponent = computed(() =>
  store.template.components?.find(component => component.type === 'BODY') || {}
); 
</script>