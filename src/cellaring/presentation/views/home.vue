

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CellarSummary from '../components/cellar-summary.vue'
import {
  getCellars,
  getStorageItems
} from '../../infrastructure/cellars-api.js'

const { t } = useI18n()

const cellars = ref([])
const storageItems = ref([])
const errorMessage = ref('')

onMounted(async () => {
  try {
    cellars.value = await getCellars()
    storageItems.value = await getStorageItems()
  } catch (error) {
    errorMessage.value = t('loadError')
    console.error(error)
  }
})

const getWinesByCellar = (cellarId) => {
  return storageItems.value.filter(
      item => String(item.cellarId) === String(cellarId)
  )
}

const getTotalBottles = (cellarId) => {
  return getWinesByCellar(cellarId).reduce(
      (total, item) => total + Number(item.quantity),
      0
  )
}
</script>

<template>
  <main class="p-4">
    <h1>{{ t('home') }}</h1>
    <h2>{{ t('myCellars') }}</h2>

    <p v-if="errorMessage" role="alert">
      {{ errorMessage }}
    </p>

    <div class="grid">
      <div
          v-for="cellar in cellars"
          :key="cellar.id"
          class="col-12 md:col-6"
      >
        <cellar-summary
            :name="cellar.name"
            :capacity="cellar.capacity"
            :bottles="getTotalBottles(cellar.id)"
            :wines="getWinesByCellar(cellar.id)"
        />
      </div>
    </div>
  </main>
</template>
