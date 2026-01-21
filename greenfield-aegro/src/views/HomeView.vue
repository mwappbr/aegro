<script setup lang="ts">
import { APP_TITLE, APP_VERSION } from '@/utils/constants'
</script>

<template>
  <div class="home-view">
    <header class="text-center mb-8">
      <h1 class="text-3xl font-semibold text-primary mb-2">
        {{ APP_TITLE }}
      </h1>
      <p class="text-gray-600">
        Versão {{ APP_VERSION }} - Hacker News com acessibilidade aprimorada
      </p>
    </header>

    <section
      aria-labelledby="welcome-heading"
      class="card max-w-content mx-auto"
    >
      <h2 id="welcome-heading" class="text-xl font-medium text-gray-800 mb-4">
        Bem-vindo ao HN Acessível
      </h2>
      <p class="text-gray-600 leading-relaxed">
        Esta aplicação oferece uma interface acessível para navegar pelas
        histórias e comentários do Hacker News. O projeto foi desenvolvido
        seguindo as diretrizes WCAG 2.1 AA para garantir que todos os usuários
        possam acessar o conteúdo de forma eficiente.
      </p>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  padding-top: var(--spacing-lg);
}
</style>
