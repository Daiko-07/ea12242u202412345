
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>

<template>
  <main>
    <h1>404 - Page Not Found</h1>

    <p>
      Route {{ route.path }} was not found.
    </p>

    <button @click="goHome">
      Go Home
    </button>
  </main>
</template>
