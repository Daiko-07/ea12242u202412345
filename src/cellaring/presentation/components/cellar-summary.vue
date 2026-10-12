
<script setup>
import PvCard from 'primevue/card'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  name: String,
  capacity: Number,
  bottles: Number,
  wines: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <pv-card>
    <template #title>
      {{ name }}
    </template>

    <template #content>
      <p>{{ t('totalBottles') }}: {{ bottles }}</p>

      <h4>{{ t('storedWines') }}</h4>

      <p v-if="wines.length === 0">
        {{ t('empty') }}
      </p>

      <ul v-else>
        <li v-for="wine in wines" :key="wine.id">
          {{ wine.wineName || t('unknownWine') }}
          - {{ wine.quantity }} {{ t('bottles') }}
        </li>
      </ul>
    </template>

    <template #footer>
      {{ t('availableCapacity') }}: {{ capacity - bottles }}
    </template>
  </pv-card>
</template>
