import { defineStore } from 'pinia';
import templateData from '@/data/template.json'; // Import JSON file
import { downloadJSON } from "@/utils/fileDownloader.js";  // Import JSON file



export const useTemplateStore = defineStore('templateStore', {
    state: () => ({
        template: {}, // Initialize as an empty object
        isThereButtonsSection: 'true',
        availableCategories: ['marketing', 'utility'],
    }),

    getters: {
        getTemplate: (state) => state.template,
        getButtonsStatus: (state) => state.isThereButtonsSection,
        getCategories: (state) => state.availableCategories,
        getTemplateMessage: (state) => {
            // return state.template
            function getComponent(targetType) {
                return state.template.components?.find(section => section.type === targetType)
            }
            const header = getComponent("HEADER");
            const body = getComponent("BODY");
            const footer = getComponent("FOOTER");
            const buttons = getComponent("BUTTONS");

            // let message = {}
            return {
                headerType: header?.format,
                headerText: header?.format === "TEXT" ? header.value?.text : null,
                headerImageUrl: header?.format === "IMAGE" ? header.value?.url : null,
                bodyText: body?.text,
                footerText: footer?.text,
                buttons: buttons?.buttons.map((btn) => ({
                    buttonActionType: btn.type,
                    buttonText: btn.text,
                    buttonValue: btn.value,

                    buttonUrl: '',
                    buttonPhoneNumber: '',
                }))
            };
        },
    },

    actions: {
        async loadTemplate() {
            // Assign imported JSON data to the state
            this.template = templateData;
        },
        selectCategory(category) {
            this.template.category = category;
        },
        setBodyText(bodyText) {
            const bodyComponent = this.template.components.find((section) => section.type === 'BODY');
            if (bodyComponent) {
                bodyComponent.text = bodyText;
            } else {
                console.error('BODY component not found or invalid structure');
            }
        },

        setButtonsStatus(status) {
            this.isThereButtonsSection = status;
        },
        setPhoneNumber(buttonIndex, newNumber) {
            const buttonsComponent = this.template.components.find((component) => component.type === 'BUTTONS');
            buttonsComponent.buttons[buttonIndex].value.phone_number = newNumber

            console.log(buttonIndex, newNumber);

            // this.template.name = name;
        },

        // Add/Remove button - in "BUTTONS" component
        addButton() {
            const newButton = {
                type: "URL",
                text: "",
                value: {
                    url: "",
                    phone_number: "",
                    countryCode: "",
                },
            }
            const buttonsComponent = this.template.components.find((component) => component.type === 'BUTTONS');

            if (buttonsComponent && buttonsComponent.buttons) {
                buttonsComponent.buttons.push(newButton);
            } else {
                console.error('BUTTONS component not found or invalid structure');
            }
        },

        removeButton(index) {
            const buttonsComponent = this.template.components.find(
                (component) => component.type === 'BUTTONS'
            );
            if (buttonsComponent && buttonsComponent.buttons) {
                if (index >= 0 && index < buttonsComponent.buttons.length) {
                    buttonsComponent.buttons.splice(index, 1);
                } else {
                    console.error('Invalid button index');
                }
            } else {
                console.error('BUTTONS component not found or invalid structure');
            }
        },

        saveTemplate() {
            const finalTemplateObject = JSON.parse(JSON.stringify(this.getTemplate));
            const buttonsComponent = finalTemplateObject.components.find((component) => component.type === 'BUTTONS');

            buttonsComponent?.buttons.slice().map((btn) => {
                if (btn.type === 'URL') {
                    btn.value = { url: btn.value.url }
                }
                if (btn.type === 'PHONE_NUMBER') {
                    btn.value = { phone_number: btn.value.countryCode + '' + btn.value.phone_number }
                }
                console.log(btn);
            })

            const confirmed = confirm(`Are you sure that you want to download ${this.template.name} template?`);
            if (confirmed) downloadJSON(finalTemplateObject, `${this.template.name}_template.json`);

            console.log('Template saved!!!');
        }
    },
});
