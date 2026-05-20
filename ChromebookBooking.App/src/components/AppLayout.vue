<script setup lang="ts">
  import { useAuthStore } from '../stores/auth'
  import AppSidebar from './AppSidebar.vue'

  const authStore = useAuthStore()

  const isAdmin = authStore.profile?.role === 'Admin'
</script>

<template>
  <AppSidebar v-if="isAdmin" />
  <RouterView></RouterView>
</template>

<style scoped>

</style>
