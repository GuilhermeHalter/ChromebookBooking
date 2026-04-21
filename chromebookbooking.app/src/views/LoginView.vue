<script setup lang="ts">
  import { useAuthStore } from "../stores/auth"
  import BaseButton from '../components/ui/BaseButton.vue'

  const authStore = useAuthStore()
</script>

<template>
  <BaseButton v-if="!authStore.user" @click="authStore.loginWithGoogle" label="Entrar com Google" />
</template>

<style scoped>

</style>
