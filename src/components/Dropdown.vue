<script lang="ts" setup>
import { ref } from "vue"

import { useTodosStore } from "../store/todos"
import { EStatus } from "../types"
import Dots from "../assets/dots.svg"
import BlackDots from "../assets/dots-black.svg"

const { id } = defineProps({
  id: String,
})
const open = ref(false)
const todoStore = useTodosStore()
const handleDelete = async () => {
  await todoStore.deleteTodo(parseInt(id ?? ""))
  open.value = false
}
const handleMove = async () => {
  await todoStore.updateTodo(parseInt(id ?? ""), EStatus.BACKED)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <div @click="open = true">
      <div
        class="rounded-full transition w-10 h-10 flex items-center justify-center"
        :class="{ 'bg-gray-200 ': open }"
      >
        <img
          :src="open ? BlackDots : Dots"
          :class="{ 'fill-black': open }"
          class="cursor-pointer"
        />
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="open">
        <div class="fixed inset-0 z-20" @click="open = false"></div>
        <ul
          class="absolute z-30 w-40 right-12 -bottom-3 bg-white divide-y divide-line border rounded-md text-primary cursor-pointer"
        >
          <li @click="handleDelete" class="px-3 py-2 rounded-md text-xs">
            Delete
          </li>
          <li @click="handleMove" class="px-3 py-2 rounded-md text-xs">
            Move to Backlog
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
