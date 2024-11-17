<template>

  <section class="form-section buttons-section">
    <h2 class="section-title">Buttons</h2>


    <p class="section-description">
      Create buttons that let your customers respond to your message or take an action.
    </p>
    <div class="section-content">
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center align-items-lg-start ">
        <div class="button-options p-1">

          <label class="button-option option" :class="{ active: store.isThereButtonsSection == 'false' }">
            <input @keydown.enter.prevent type="radio" v-model="store.isThereButtonsSection"
              @input="store.setButtonsStatus('false')" value="false" class="visually-hidden" />
            <span class="option-text">None</span>
          </label>
          <label class="button-option option" :class="{ active: store.isThereButtonsSection == 'true' }">
            <input @keydown.enter.prevent type="radio" v-model="store.isThereButtonsSection"
              @input="store.setButtonsStatus('true')" value="true" class="visually-hidden" />
            <img width="16" height="16" src="/src/assets/images/actions.svg" alt="option-icon" />
            <span class="option-text text-center text-md-start">Call to actions </span>
          </label>
        </div>

        <div  v-show="store.isThereButtonsSection == 'true'">
          <button @click.stop.prevent.self="store.addButton()" id="addNewButton"
            class="button--option  mt-2 mb-4 mt-md-0 mb-md-3 mx-lg-5 rounded-3 w-auto px-3 justify-content-center border btn-outline-success transition">
            Add Button</button>
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
                      Button Type
                      <span class="required-asterisk">*</span>
                    </label>
                    <div class="select-wrapper">
                      <select :id="'buttonActionType' + actionButtonIndex" v-model="actionButton.type"
                        class="form-select" required aria-required="true">
                        <option value="" disabled>Select</option>
                        <option value="URL">Visit Website</option>
                        <option value="CALL">Phone Number</option>
                      </select>

                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-xl-3 col-xxl-3">

                  <div class="form-group">
                    <label :for="'buttonText' + actionButtonIndex" class="form-label">
                      Button Text
                      <span class="required-asterisk">*</span>
                    </label>
                    <input @keydown.enter.prevent :id="'buttonText' + actionButtonIndex" v-model="actionButton.text"
                      type="text" class="form-input" required aria-required="true"
                      :placeholder="actionButton.type === 'URL' ? 'Offer Details' : 'Call Us'" />
                  </div>

                </div>

                <div class="col-lg-6 col-xxl-6">
                  <div v-if="actionButton.type === 'URL'" class="form-group">
                    <label :for="'buttonUrl' + actionButtonIndex" class="form-label">
                      Website URL
                      <span class="required-asterisk">*</span>
                    </label>
                    <input @keydown.enter.prevent :id="'buttonUrl' + actionButtonIndex" v-model="actionButton.value.url"
                      type="url" class="form-input" required aria-required="true" />
                  </div>

                  <div v-if="actionButton.type === 'CALL'" class="form-group">
                    <label for="buttonPhoneNumber" class="form-label">
                      Phone Number
                      <span class="required-asterisk">*</span> 
                    </label>

                    <PhoneNumber :actionButtonIndex="`${actionButtonIndex}`" />



                  </div>
                </div>

              </div>
            </div>

            <button class="btn del btn-remove m-auto" @click.prevent="removeBtn(actionButtonIndex)">
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
    {
      "type": "URL",
      "text": "",
      "value": {
        "url": "https://arabot.io"
      }
    },
    {
      "type": "CALL",
      "text": "",
      "value": {
        "phone_number": "+96279XXXXXXX"
      }
    }

  ]
});

const buttonType = ref('');
const phoneVumber = ref('');
buttonType.value = computed(() => store.buttonType)

// const actionButton = ref({
//   value: {
//     phone_number: ""
//   }
// });
// const buttonsArray = ref([]);
// const countryCode = ref('');
// function changeCountryCode(index, event) {
//   console.log("countryCode: ", event, "index: ", index);
// }
// const updatePhoneNumber = (newNumber) => {
//   actionButton.value.phone_number = newNumber; // Update the value
// };

function removeBtn(actionButtonIndex) {
  const confirmed = confirm(`Are you sure that you want to remove button NO. ${actionButtonIndex + 1}?`);
  if (confirmed)
    store.removeButton(actionButtonIndex)
}


onMounted(async () => {
  await nextTick();
  theComponent.value = store.template.components?.find(component => component.type == 'BUTTONS')
  // console.log("BUTTONS: ", theComponent.value); //buttons
})

</script>


<style scoped>
select.form-select {
  appearance: none;
  width: 100%;
  padding-right: 30px;
  text-indent: 10px;
  /*  text-align: left;
  direction: ltr;*/
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
</style>