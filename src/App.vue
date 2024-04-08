<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
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
</style>
