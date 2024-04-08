<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
:root {
  --color-background: #f7fcff;
  --color-text: #333;
  --color-border: #ccc;
  --font-base: 'Roboto', sans-serif; /* Example using Roboto from Google Fonts */
}

html,
body {
  height: 100%;
  margin: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-base);
}

#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  width: 95vw;
  min-width: 30rem;
  max-width: 100rem;
  min-height: 40rem;
  margin: 0 auto;
}

header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  transition: color 0.3s ease;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a:hover {
  color: #007bff; /* Example hover color */
  background-color: transparent;
  text-decoration: none; /* Removes underline on hover */
}

nav a:first-of-type {
  border-left: 0;
}

@media (min-width: 1024px) {
  header .wrapper {
    justify-content: flex-start;
  }
}
</style>
