
<script setup>
import PvToolbar from 'primevue/toolbar'
import PvButton from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
  <pv-toolbar>
    <template #start>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-box"></i>
        <span>Kessick Wine Storage Systems</span>
      </div>
    </template>

    <template #center>
      <div class="flex gap-2">
        <router-link to="/home">
          <pv-button :label="t('home')" text />
        </router-link>

        <router-link to="/storage/items/new">
          <pv-button :label="t('newItem')" text />
        </router-link>
      </div>
    </template>

    <template #end>
      <div class="flex gap-2">
        <pv-button
            label="EN"
            outlined
            @click="locale = 'en'"
        />

        <pv-button
            label="ES"
            outlined
            @click="locale = 'es'"
        />
      </div>
    </template>
  </pv-toolbar>
</template>
