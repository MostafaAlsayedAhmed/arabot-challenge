<script setup>
import { RouterLink, RouterView } from 'vue-router' 
</script>

<template>
  <!-- <header v-if="0"> <nav> <RouterLink to="/">Template</RouterLink> <RouterLink to="/templates">  List</RouterLink> </nav> </header> -->
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
@import '/assets/styles/main.scss';
</style>