<script lang="ts" setup>
import { ref, watch, onUnmounted } from "vue"
import { useRoute } from "vue-router"

import { useTodosStore } from "../../store/todos"
import PrimaryButton from "../../components/PrimaryButton.vue"

const todoStore = useTodosStore()
const name = ref("")
const timer = ref<number | undefined>()
const hasError = ref(false)
const route = useRoute()
const current = ref(route.name)
const handleAdd = async () => {
  if (name.value) {
    await todoStore.addTodo(name.value)
    name.value = ""
  } else {
    hasError.value = true
  }
}

watch(
  () => route.name,
  (val) => {
    current.value = val
  }
)

watch(hasError, () => {
  if (hasError.value) {
    timer.value = setTimeout(() => {
      hasError.value = false
    }, 3000)
  }
})

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>
<template>
  <div class="relative mb-5 px-4 md:px-0">
    <form @submit.prevent="handleAdd" class="flex space-x-4 w-full">
      <input
        name="name"
        v-model="name"
        placeholder="Roboto, Regular, 15px"
        :disabled="current === 'backlog'"
        class="border rounded outline-none flex-auto px-4"
      />
      <PrimaryButton
        type="submit"
        name="Add Item"
        class="flex-initial"
        :disabled="current === 'backlog' || !name"
      />
    </form>
    <transition name="slide-fade">
      <div
        v-if="hasError"
        class="z-20 absolute bg-red-500 bottom-0 right-1 text-white rounded-lg py-3 pl-12 items-center"
      >
        Should insert name
        <span
          class="px-2 py-1 rounded-md border-white border ml-12 mr-2 cursor-pointer"
          @click="hasError = false"
        >
          X
        </span>
      </div>
    </transition>
  </div>
</template>
