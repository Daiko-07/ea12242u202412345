
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import PvButton from 'primevue/button'
import PvSelect from 'primevue/select'
import PvInputNumber from 'primevue/inputnumber'

import {
  getCellars,
  getStorageItems,
  createStorageItem
} from '../../infrastructure/cellars-api.js'

import { getWinesByType } from '../../../winery/infrastructure/wines-api.js'

const router = useRouter()
const { t } = useI18n()

const cellars = ref([])
const storageItems = ref([])
const wines = ref([])

const wineTypes = [
  'reds', 'whites', 'sparkling',
  'rose', 'dessert', 'port'
]

const selectedType = ref(null)
const selectedWine = ref(null)
const quantity = ref(1)
const errorKey = ref('')
const saving = ref(false)
const loadingWines = ref(false)

onMounted(async () => {
  try {
    cellars.value = await getCellars()
    storageItems.value = await getStorageItems()
  } catch (error) {
    errorKey.value = 'loadError'
    console.error(error)
  }
})

watch(selectedType, async (type, _, onCleanup) => {
  selectedWine.value = null
  wines.value = []
  errorKey.value = ''

  if (!type) return

  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  loadingWines.value = true

  try {
    const result = await getWinesByType(type)

    if (!cancelled) {
      wines.value = result
    }
  } catch (error) {
    if (!cancelled) {
      errorKey.value = 'wineLoadError'
    }
  } finally {
    if (!cancelled) {
      loadingWines.value = false
    }
  }
})

const selectedCellar = computed(() =>
    cellars.value.find(
        cellar => cellar.wineType === selectedType.value
    )
)

const availableCapacity = computed(() => {
  if (!selectedCellar.value) return 0

  const used = storageItems.value
      .filter(item =>
          String(item.cellarId) === String(selectedCellar.value.id)
      )
      .reduce(
          (sum, item) => sum + Number(item.quantity),
          0
      )

  return Number(selectedCellar.value.capacity) - used
})

const createItem = async () => {
  errorKey.value = ''

  if (!selectedType.value || !selectedWine.value) {
    errorKey.value = 'selectRequired'
    return
  }

  if (!selectedCellar.value) {
    errorKey.value = 'noCellar'
    return
  }

  if (!Number.isInteger(quantity.value) || quantity.value <= 0) {
    errorKey.value = 'invalidQuantity'
    return
  }

  if (quantity.value > availableCapacity.value) {
    errorKey.value = 'notEnoughCapacity'
    return
  }

  saving.value = true

  try {
    await createStorageItem({
      cellarId: selectedCellar.value.id,
      wineId: selectedWine.value.id,
      wineName: selectedWine.value.wine,
      quantity: quantity.value,
      date: new Date().toISOString().split('T')[0]
    })

    router.push('/home')
  } catch (error) {
    errorKey.value = 'saveError'
    console.error(error)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <main class="p-4">
    <h1>{{ t('newItem') }}</h1>
    <p>{{ t('addWine') }}</p>

    <form
        @submit.prevent="createItem"
        class="flex flex-column gap-3"
    >
      <label for="wine-type">{{ t('wineType') }}</label>
      <pv-select
          inputId="wine-type"
          v-model="selectedType"
          :options="wineTypes"
          :placeholder="t('selectType')"
      />

      <label for="wine">{{ t('wine') }}</label>
      <pv-select
          inputId="wine"
          v-model="selectedWine"
          :options="wines"
          optionLabel="wine"
          :placeholder="t('selectWine')"
          :loading="loadingWines"
          :disabled="!selectedType || loadingWines"
          filter
      />

      <label for="quantity">{{ t('quantity') }}</label>
      <pv-input-number
          inputId="quantity"
          v-model="quantity"
          :min="1"
          showButtons
      />

      <p v-if="selectedCellar">
        {{ t('availableCapacity') }}:
        {{ availableCapacity }}
      </p>

      <p v-if="errorKey" role="alert">
        {{ t(errorKey) }}
      </p>

      <div class="flex gap-2">
        <pv-button
            :label="t('cancel')"
            severity="secondary"
            type="button"
            @click="router.push('/home')"
        />

        <pv-button
            :label="t('create')"
            type="submit"
            :loading="saving"
            :disabled="saving"
        />
      </div>
    </form>
  </main>
</template>
