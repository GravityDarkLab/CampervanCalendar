<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-50" id="app-header">
    <div>
      <nav class="bg-gray-50">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
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
  padding: 2rem 0;
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
  color: #007bff;
  background-color: transparent;
  text-decoration: none;
}

nav a:first-of-type {
  border-left: 0;
}
</style>
