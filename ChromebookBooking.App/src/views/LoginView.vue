<script setup lang="ts">
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import { useAuthStore } from "../stores/auth"

  const authStore = useAuthStore()
</script>

<template>
  <div class="login-container">
    <div class="left-panel"></div>
    <div class="right-panel">
      <div class="content-wrapper">
        <h1 class="page-title">Reserva de Chromebooks</h1>
        <Card>
          <template #content>
            <div class="card-content">
              <h2 class="welcome-title">Bem-Vindo</h2>
              <p class="instruction-text">Faça login com sua conta Google institucional para acessar o sistema</p>
              <Button class="google-btn" outlined @click="authStore.loginWithGoogle">
                <img src="/public/google-logo.svg"
                     alt="Logo do Google"
                     class="google-icon" />
                <span class="btn-text">Entrar com Google</span>
              </Button>
              <p class="restriction-text">Acesso restrito a contas @edu.joinville.sc.gov.br</p>
            </div>
          </template>
        </Card>
        <footer class="footer-text">
          © 2026 Engenharia de Software · Católica SC
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
      display: flex;
      height: 100vh;
      background-color: var(--background);
  }

  .left-panel {
      flex: 1;
      background-color: var(--primary);
  }

  .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .content-wrapper {
      width: 100%;
      max-width: 480px;
      padding: 2rem;
  }

  .page-title {
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 3rem;
  }

  .card-content {
      text-align: center;
  }

  .welcome-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
  }

  .instruction-text {
      font-size: 0.875rem;
      color: var(--muted);
      margin-bottom: 2rem;
  }

  .google-btn {
      width: 100%;
  }

  .restriction-text {
      font-size: 0.75rem;
      margin-top: 1.5rem;
  }

  .footer-text {
      font-size: 0.75rem;
      margin-top: 2rem;
      text-align: center;
  }

  @media (max-width: 900px) {
      .login-container {
          flex-direction: column;
      }

      .left-panel {
          display: none;
      }
  }
</style>
