<script setup lang="ts">
  import { useAuthStore } from "../stores/auth"

  const authStore = useAuthStore()
  const modules = authStore.profile?.modules || []
</script>

<template>
  <aside>
    <nav>
      <RouterLink
        v-for="module in modules"
        :key="module"
        :to="{ name: module }">
        {{ module }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>

</style>
