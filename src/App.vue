<script setup>
import { RouterLink, RouterView } from 'vue-router'
// Load the template data when the component mounts 
</script>

<template>
  <header v-if="0">
    <div class="wrapper green">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background: var(--color-background);
  }


  nav {
    text-align: left;
    margin-left: 0rem;
    padding: 1rem;
  }
}
</style>

<style>
@import './assets/styles/main.scss';
</style>

<script>
const obbbg = {
  "language": "en_US", // Language for the template: "en_US" for English or  "ar_SA" for Arabic.
  "name": "template_name", // The name identifier for the template.
  "category": "MARKETING", // Category of the template: either "MARKETING" or  "UTILITY".
  "components": [
    {
      "type": "HEADER",
      "format": "IMAGE", // Options: "IMAGE" or "TEXT".
      "value": {
        "url": "image_url" // Required if format is "IMAGE". Example: { "url":"https://example.com/image.jpg" }
      }
      // If format is "TEXT", use "value": { "text": "header_text" } instead.
    },
    {
      "type": "BODY",
      "text": "body_text" // Required: Main content of the message. Example:"Welcome to our service!"
    },
    {
      "type": "FOOTER",
      "text": "footer_text" // Optional: Footer text, such as disclaimers or additional notes.
      // Example: "Terms and conditions apply."
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL", // Options: "URL" or "CALL".
          "text": "button_text", // Button display text. Example: "Visit our site" or "Contact Us".
          "value": {
            "url": "https://arabot.io" // Required if type is "URL". Example: {"url": "https://arabot.io" }
          }
          // If type is "CALL", use "value": { "phone_number": "+96279XXXXXXX" } instead.
        }
      ]
    }
  ]
}
</script>