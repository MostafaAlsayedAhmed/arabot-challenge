<script setup>
// https://iamstevendao.github.io/vue-tel-input/guide/getting-started.html
import { ref } from "vue";
import { VueTelInput } from "vue-tel-input";
import 'vue-tel-input/vue-tel-input.css';
import { useTemplateStore } from '@/stores/templateStore';
const store = useTemplateStore();


const { actionButtonIndex } = defineProps({ actionButtonIndex: String });

const phone = ref("");
const inputOptions = {
    required: true,
    id: 'buttonPhoneNumber' + actionButtonIndex,
    showDialCode: true,
    placeholder: '07 XXXX XXXX',
    styleClasses: `form-input phone-input ${store.formErrors.buttons[actionButtonIndex]?.phone_number ? 'is-invalid border-danger' : ''} `,
    pattern: "^[+]?[0-9]{10,14}$"
};
</script>

<template>
    <div class="phone-input-wrapper flex-md-row">
        <VueTelInput v-model="phone" mode="international" @keydown.enter.prevent
            @input="store.setPhoneNumber(actionButtonIndex, phone)" :inputOptions="inputOptions"
            styleClasses="gap-2 border-0" />
        <div class="invalid-tooltip"
            :class="{ 'd-block': !store.validPhoneNumberRegEx.test(phone) && store.formErrors.buttons[actionButtonIndex]?.phone_number }">
            {{ $t('buttons.call.error') }}
        </div>
    </div>
</template>


<style>
.vue-tel-input {
    direction: ltr;
}

.vue-tel-input:focus-within {
    box-shadow: none;
    border: none;
}

.vti__dropdown {
    background: #fff;
    padding: 5px 5px;
    border: 1px solid #c2c2c2;
    border-radius: 8px;
    font-size: 14px;
    height: 40px;
}

.vue-tel-input+.invalid-tooltip {
    margin-left: 4rem;
}
</style>