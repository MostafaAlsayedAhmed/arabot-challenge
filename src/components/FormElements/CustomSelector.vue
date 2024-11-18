<template>
  <section class="form-section selector category">
    <h2 class="section-title">
      <slot name="title"></slot>
    </h2>

    <p class="section-description">
      <slot name="description"></slot>
    </p>


    <div class="selector-options d-flex flex-column section-content">
      <template v-for="(option, optionIndex) in options">
        <div class="selector-option d-flex" :class="{ 'selected': store.template.category === option?.toUpperCase() }"
          @click="store.selectCategory(option?.toUpperCase())" tabindex="0" role="radio"
          :aria-checked="store.template.category === option?.toUpperCase()">

          <div class="selector-icon-container">
            <img width="24" height="24" :src="`/assets/images/categories/${option}.svg`" :alt="`${option} icon`" />
          </div>

          <div class="selector-details">
            <h3 class="selector-title">{{ $t(`category.${option}.title`) }}</h3>
            <p class="selector-description mb-0">{{ $t(`category.${option}.description`) }} </p>
          </div>
        </div>
      </template>

    </div>
  </section>

</template>

<script setup>
import { ref, watch } from 'vue';
import { useTemplateStore } from '@/stores/templateStore'; 
const store = useTemplateStore();

defineProps(['options'])
</script>

<style lang="scss" scoped>
.selector {
  &-options {
    gap: 12px;
  }

  &-option {
    flex: 1;
    align-items: center;
    gap: 12px;
    padding: var(--padding-medium);
    border-radius: var(--border-radius-large);
    background-color: #e4e5ef;
    cursor: pointer;
  }

  &-option.selected {
    background-color: #d1c4e9;

    img {
      filter: invert(52%) sepia(13%) saturate(1157%) hue-rotate(229deg) brightness(100%) contrast(85%);
    }
  }

  &-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
  }

  &-icon {
    width: 24px;
    height: 24px;
  }

  &-title {
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-bottom: 4px;
  }

  &-description {
    font-size: var(--font-size-small);
    color: var(--secondary-color);
  }
}
</style>