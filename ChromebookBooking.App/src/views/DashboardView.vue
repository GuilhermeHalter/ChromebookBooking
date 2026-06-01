<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useCabinetStore } from '../stores/cabinet'
  import { useAuthStore } from '../stores/auth'

  const cabinetStore = useCabinetStore()
  const authStore = useAuthStore()

  onMounted(() => {
    cabinetStore.getAllCabinets()
  })
</script>

<template>
  {{ cabinetStore.cabinets }}
</template>

<style scoped>
</style>
