<template>
  <section class="form-section buttons-section">
    <h2 class="section-title">{{ $t('buttons.title') }}</h2>
    <p class="section-description">{{ $t('buttons.description') }} </p>



    <div class="section-content">
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center align-items-lg-start ">

        <div class="button-options p-1">
          <label class="button-option option" :class="{ active: store.isThereButtonsSection == 'false' }">
            <input @keydown.enter.prevent type="radio" v-model="store.isThereButtonsSection"
              @input="store.setButtonsStatus('false')" value="false" class="visually-hidden" />
            <span class="option-text">{{ $t('buttons.options.none') }}</span>
          </label>
          <label class="button-option option" :class="{ active: store.isThereButtonsSection == 'true' }">
            <input @keydown.enter.prevent type="radio" v-model="store.isThereButtonsSection"
              @input="store.setButtonsStatus('true')" value="true" class="visually-hidden" />
            <img width="16" height="16" src="/src/assets/images/actions.svg" alt="option-icon" />
            <span class="option-text text-center text-md-start">{{ $t('buttons.options.cta') }} </span>
          </label>
        </div>

        <div v-show="store.isThereButtonsSection == 'true'">
          <button @click.stop.prevent.self="store.addButton()" id="addNewButton"
            class="btn btn-outline-success mt-2 mb-4 mt-md-2 mb-md-3 mx-sm-5 rounded-3 w-auto px-3 justify-content-center border transition">
           + {{ $t('buttons.add') }} </button>
        </div>
      </div>

      <div v-if="store.isThereButtonsSection == 'true'" class="buttons-form buttons-list">
        <template v-for="(actionButton, actionButtonIndex) in theComponent.buttons" :key="actionButtonIndex">
          <!-- <div class="col-12 mb-3"> {{ actionButtonIndex }} {{ actionButton }} </div> -->
          <div class="position-relative d-flex justify-content-between mb-3">

            <div class="button-row p-4 w-100">
              <div class="row">
                <div class="col-sm-6 col-xl-3 col-xxl-3">
                  <div class="form-group">
                    <label :for="'buttonActionType' + actionButtonIndex" class="form-label">
                      {{ $t('buttons.types.title') }}
                      <span class="required-asterisk">*</span>
                    </label>
                    <div class="select-wrapper">
                      <select :id="'buttonActionType' + actionButtonIndex" v-model="actionButton.type"
                        class="form-select" required aria-required="true">
                        <option value="" disabled> {{ $t('buttons.types.select') }}</option>
                        <option value="URL"> {{ $t('buttons.types.url') }}</option>
                        <option value="CALL"> {{ $t('buttons.types.call') }} </option>
                      </select>

                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-xl-3 col-xxl-3">
                  <div class="form-group has-validation position-relative">
                    <label :for="'buttonText' + actionButtonIndex" class="form-label">
                      {{ $t('buttons.text.title') }}
                      <span class="required-asterisk">*</span>
                    </label>
                    <input @keydown.enter.prevent :id="'buttonText' + actionButtonIndex" v-model="actionButton.text"
                      type="text" class="form-input" required aria-required="true"
                      :class="{ 'is-invalid border-danger': actionButton.text.length < 1 && store.formErrors.buttons[actionButtonIndex]?.text }"
                      :placeholder="actionButton.type === 'URL' ? $t('buttons.url.textHelp') : $t('buttons.call.textHelp')" />
                    <div class="invalid-tooltip"> Required Input </div>
                  </div>
                </div>



                <div class="col-lg-6 col-xxl-6">
                  <div v-if="actionButton.type === 'URL'" class="form-group has-validation position-relative">
                    <label :for="'buttonUrl' + actionButtonIndex" class="form-label">
                      {{ $t('buttons.url.title') }}
                      <span class="required-asterisk">*</span>
                    </label>
                    <input @keydown.enter.prevent :id="'buttonUrl' + actionButtonIndex" v-model="actionButton.value.url"
                      type="url" class="form-input" placeholder="https://arabot.io"
                      :class="{ 'is-invalid border-danger': !store.validUrlRegEx.test(actionButton.value.url) && store.formErrors.buttons[actionButtonIndex]?.url }"
                      style="direction: ltr;" required aria-required="true" />
                    <!-- actionButton.value.url.length < 1  -->

                    <div class="invalid-tooltip"> A valid Url is Required </div>
                  </div>



                  <div v-if="actionButton.type === 'CALL'" class="form-group has-validation position-relative">
                    <label for="buttonPhoneNumber" class="form-label">
                      {{ $t('buttons.call.title') }}
                      <span class="required-asterisk">*</span>
                    </label>

                    <PhoneNumber :actionButtonIndex="`${actionButtonIndex}`" /> 
                  </div>


                </div>
              </div>
            </div>

            <button class="btn del btn-remove m-auto" @click.prevent="store.removeButton(actionButtonIndex)">
              <img width="16" height="16" src="/src/assets/images/delete-btn.svg" alt="delete-btn" />
            </button>
          </div>
        </template>
      </div>

    </div>
  </section>


</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import PhoneNumber from '@/components/FormElements/PhoneNumber.vue';

import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();

const theComponent = ref({
  "type": "BUTTONS",
  "buttons": [
    { "type": "URL", "text": "", "value": { "url": "" } },
    { "type": "CALL", "text": "", "value": { "phone_number": "" } }
  ]
});
   
 
onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'BUTTONS');
}) 
</script>


<style scoped>
select.form-select {
  appearance: none;
  width: 100%;
  padding-right: 30px;
  text-indent: 10px;
  /* text-align: left;  direction: ltr;*/
}

.form-select::after {
  content: '▼';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #000;
}

.input-error {
  color: red;
  display: block;
  margin-top: -15px;
}
</style>