<script lang="ts" setup>
import Header from "./partials/Header.vue"
import Footer from "./partials/Footer.vue"
</script>

<template>
  <main class="max-w-3.5xl py-7 mx-auto flex flex-col h-screen">
    <Header class="flex-initial" />
    <div class="flex-auto overflow-y-auto overflow-x-hidden">
      <router-view></router-view>
    </div>
    <Footer class="flex-initial py-2" />
  </main>
</template>
