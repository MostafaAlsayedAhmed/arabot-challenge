# Arabot Project

A template message tool.

The app should allow users to create and preview customizable template messages with sections like header, body, footer, and buttons, along with category selection.

## Check the Project

See [Demo in Netlify](https://template-message-challenge.netlify.app/).
 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup
###  Prerequisites:
 --- Node.js: Ensure Node.js (v18.18 or higher) is installed.
 
 --- Vue CLI: Install Vue CLI globally using npm install -g @vue/cli.
 
 --- Git: Ensure Git is installed for cloning the repository.


### Steps to Set Up the Project

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Available JSON templates for testing

There are 2 files in "src/data", I import one of them in the store "src\stores\templateStore.js"

= For the full data you can use => "template2.json" (Current File),

= For the omitted data (Missing Sections) you can use => "template.json"



### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
