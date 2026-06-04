<script setup>
import NavMain from '../components/layout/NavMain.vue'
import FooterMain from '../components/layout/FooterMain.vue'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark text-white">
      <NavMain />
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md" style="max-width: 1100px; margin: 0 auto">
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer class="bg-grey-1 text-grey-8">
      <FooterMain />
    </q-footer>
  </q-layout>
</template>
