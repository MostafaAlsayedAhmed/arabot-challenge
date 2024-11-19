import { defineStore } from 'pinia';
// For the full data "template2.json", for the omitted data (Missing Sections) "template.json"
import templateData from '@/data/template2.json';
import { downloadJSON } from "@/utils/fileDownloader.js";  // Import JSON-file Downloader 



export const useTemplateStore = defineStore('templateStore', {
    // persist: true, //pinia-plugin-persistedstate

    state: () => ({
        template: {}, // Initialize as an empty object
        isThereButtonsSection: 'true',
        availableCategories: ['marketing', 'utility'],

        validPhoneNumberRegEx: /^\+?[0-9 ]{7,16}$/, // Validate phone numbers
        validUrlRegEx: /^https?:\/\/[^\s/$.?#].[^\s]*$/, // Validate URL format

        formErrors: {
            templateNameEmpty: false,
            headerTextEmpty: false,
            headerImageEmpty: false,
            bodyTextEmpty: false,

            buttons: [{
                text: false,
                phone_number: false, //required & should be valid format if the buttonType is 'CALL'
                url: false, //required & should be valid format if the buttonType is 'URL'
            }],
        }
    }),

    getters: {
        getTemplate: (state) => state.template,
        getTemplateName: (state) => state.template?.name,
        getButtonsStatus: (state) => state.isThereButtonsSection,
        getCategories: (state) => state.availableCategories,
        getAavailableComponents: (state) => state.template?.components?.map(comp => comp.type),

        getfooterText: (state) => state.template.components?.find(component => component.type == 'FOOTER'),

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
            this.template = templateData;  // Assign imported JSON data to the state
        },
        setName(name) {
            this.template.name = name;
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
            buttonsComponent.buttons[buttonIndex].value.phone_number = newNumber;
        },

        // Add/Remove button - in "BUTTONS" component
        addButton() {
            const newButton = {
                type: "URL",
                text: "",
                value: {
                    url: "",
                    phone_number: "",
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
            const confirmed = confirm(`Are you sure that you want to remove button NO. ${index + 1}?`);

            if (confirmed) {
                const buttonsComponent = this.template.components.find((component) => component.type === 'BUTTONS');

                if (buttonsComponent && buttonsComponent.buttons) {
                    if (index >= 0 && index < buttonsComponent.buttons.length) {
                        buttonsComponent.buttons.splice(index, 1);
                    } else {
                        console.error('Invalid button index');
                    }
                } else {
                    console.error('BUTTONS component not found or invalid structure');
                }
            }
        },

        validateForm() {
            const headerComponent = this.template.components.find((component) => component.type === 'HEADER');
            const bodyComponent = this.template.components.find((component) => component.type === 'BODY');
            const buttonsComponent = this.template.components.find((component) => component.type === 'BUTTONS');

            // validate Inputs
            this.formErrors.templateNameEmpty = (this.template.name?.length < 5) ? true : false;
            this.formErrors.bodyTextEmpty = (bodyComponent?.text.trim()?.length < 5) ? true : false;

            if (headerComponent?.format == 'TEXT') {
                this.formErrors.headerTextEmpty = (headerComponent.value.url || headerComponent.value.text?.trim().length < 5) ? true : false;
            } else if (headerComponent?.format == 'IMAGE') {
                this.formErrors.headerImageEmpty = (headerComponent.value.text || !headerComponent.value.url.includes('http')) ? true : false;
            } else {
                this.formErrors.headerTextEmpty = this.formErrors.headerImageEmpty = false;
            }


            // Validate buttons array
            this.formErrors.buttons = buttonsComponent?.buttons.map((button) => {
                const errors = {};
                errors.text = (button?.text.trim()?.length == 0) ? true : false;

                if (button.type === 'CALL') {
                    errors.phone_number = !button.value.phone_number || !this.validPhoneNumberRegEx.test(button.value.phone_number);
                }

                if (button.type === 'URL') {
                    errors.url = !button.value.url || !this.validUrlRegEx.test(button.value.url);
                }

                return errors;
            });

            // Check if there are any errors
            const hasErrors =
                this.formErrors.templateNameEmpty ||
                this.formErrors.headerTextEmpty || this.formErrors.headerImageEmpty ||
                this.formErrors.bodyTextEmpty ||
                this.formErrors.buttons.some((buttonErrors) => buttonErrors.phone_number || buttonErrors.url);

            return !hasErrors; // Return true, if the form valid
        },

        saveTemplate() {
            if (this.validateForm()) {

                const finalTemplateObject = JSON.parse(JSON.stringify(this.getTemplate));
                const buttonsComponent = finalTemplateObject.components.find((component) => component.type === 'BUTTONS');

                buttonsComponent?.buttons.slice().map((btn) => {
                    if (btn.type === 'URL') btn.value = { url: btn.value.url }
                    if (btn.type === 'CALL') btn.value = { phone_number: btn.value.phone_number }
                })

                const confirmed = confirm(`Are you sure that you want to download ${this.template.name} template?`);
                if (confirmed) downloadJSON(finalTemplateObject, `${this.template.name}_template.json`);

                alert('Template is Valid and Saved Successfully! 🎉');
            } else {
                alert('Please correct the errors in the form.');
            }
        }
    },
});
