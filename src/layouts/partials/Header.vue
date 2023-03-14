<template>
  <div class="flex gap-4 border-b px-4 md:px-0">
    <div
      v-for="tab in tabs"
      :class="`border-primary text-2.5xl font-bold ${
        current === tab.name ? 'border-b-4 text-black pb-3' : 'text-gray-300'
      }`"
    >
      <router-link :to="tab.name">{{ tab.label }}</router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref } from "vue"
import { useRoute } from "vue-router"

const tabs = [
  { name: "todos", label: "To Do List" },
  { name: "backlog", label: "Backlog" },
]

const route = useRoute()
const current = ref(route.name)

watch(
  () => route.name,
  (val) => {
    current.value = val
  }
)
</script>
