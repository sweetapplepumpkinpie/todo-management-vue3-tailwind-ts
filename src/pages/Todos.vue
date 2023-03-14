<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { ref } from "vue"

import TodoItem from "../components/TodoItem.vue"
import Dropdown from "../components/Dropdown.vue"
import { useTodosStore } from "../store/todos"
import { EStatus } from "../types"
import ArrowDown from "../assets/arrow-down.svg"
import ArrowRight from "../assets/arrow-right.svg"

const todoStore = useTodosStore()
const open = ref(false)
const { undoneTodos, doneTodos } = storeToRefs(todoStore)
const handleChange = (event: Event) => {
  const { name, checked } = event.target as HTMLInputElement

  todoStore.updateTodo(parseInt(name), checked ? EStatus.DONE : EStatus.INITIAL)
}
</script>

<template>
  <div class="border-b px-4 md:px-0">
    <div class="flex items-center">
      <img
        :src="open ? ArrowDown : ArrowRight"
        @click="open = !open"
        class="mr-4 my-4 w-3 h-3 cursor-pointer"
      />
      <div class="text-gray-300">{{ doneTodos.length }} Done</div>
    </div>
    <div v-if="open">
      <transition-group name="list" tag="div" class="space-y-4 py-4">
        <div v-for="todo in doneTodos" :key="todo.id">
          <TodoItem :todo="todo" :done="true" @change="handleChange" />
        </div>
      </transition-group>
    </div>
  </div>
  <transition-group name="list" tag="div" class="space-y-4 py-4 px-4 md:px-0">
    <div v-for="todo in undoneTodos" :key="todo.id">
      <div class="flex justify-between">
        <TodoItem :todo="todo" @change="handleChange" />
        <Dropdown :id="todo.id.toString()" />
      </div>
    </div>
  </transition-group>
</template>
