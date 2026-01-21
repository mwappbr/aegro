<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container" class="min-h-screen bg-gray-50">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">
      Pular para o conteúdo principal
    </a>

    <!-- Main Content -->
    <main id="main-content" class="container-page py-8" tabindex="-1">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
