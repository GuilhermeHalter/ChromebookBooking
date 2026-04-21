<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BaseButton from '../components/ui/BaseButton.vue'
  import BaseInput from '../components/ui/BaseInput.vue'
  import InputText from 'primevue/inputtext'
  import { useCabinetStore } from '../stores/cabinet'
  import { useAuthStore } from '../stores/auth'

  const cabinet = ref('')
  const cabinetStore = useCabinetStore()
  const authStore = useAuthStore()

  onMounted(() => {
    cabinetStore.getAllCabinets()
  })
</script>

<template>
  <BaseButton v-if="authStore.user" @click="authStore.logout" label="Sair" />
  <BaseInput type="text" v-model="cabinet" />
  <BaseButton label="Submit" />
  {{ cabinetStore.cabinets }}
</template>

<style scoped>
</style>
