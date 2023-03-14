<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { storeToRefs } from "pinia"

import TodoItem from "../components/TodoItem.vue"
import Dropdown from "../components/Dropdown.vue"
import { useTodosStore } from "../store/todos"
import { EStatus, TTodo } from "../types"
import PrimaryButton from "../components/PrimaryButton.vue"
import SecondaryButton from "../components/SecondaryButton.vue"
import { sortTodoByField } from "../helpers"

const filter = ref<string>("")
const sortKey = ref<keyof TTodo | "">("")
const todos = ref<TTodo[]>([])
const todoStore = useTodosStore()
const { backedTodos } = storeToRefs(todoStore)
const handleChange = (event: Event) => {
  const { name, checked } = event.target as HTMLInputElement

  todoStore.updateTodo(parseInt(name), checked ? EStatus.DONE : EStatus.INITIAL)
}
const handleClick = (type: keyof TTodo) => {
  sortKey.value = type
  sortTodos()
}

const handleFilterChange = (event: Event) => {
  const { value } = event.target as HTMLInputElement

  filter.value = value
  filterTodos()
}

const moveToList = (id: number) => {
  todoStore.updateTodo(id, EStatus.INITIAL)
}

watch(
  () => backedTodos.value.length,
  () => {
    initTodos()
  }
)

const filterTodos = () => {
  if (filter.value) {
    todos.value = todos.value.filter((todo) => todo.name.includes(filter.value))
  } else {
    todos.value = backedTodos.value
  }
}

const sortTodos = () => {
  if (sortKey.value) {
    todos.value.sort((a: TTodo, b: TTodo) => {
      return sortTodoByField(a, b, sortKey.value as keyof TTodo)
    })
  }
}
const initTodos = () => {
  todos.value = backedTodos.value
  filterTodos()
  sortTodos()
}

onMounted(() => {
  initTodos()
})
</script>

<template>
  <div class="flex space-x-4 my-4 px-4 md:px-0">
    <input
      name="name"
      :value="filter"
      @keyup="handleFilterChange"
      placeholder="Search"
      class="border rounded-md outline-none flex-auto px-4"
    />
    <PrimaryButton
      name="Sort by Name"
      class="flex-initial"
      @click="() => handleClick('name')"
    ></PrimaryButton>
    <PrimaryButton
      name="Sort by Date"
      class="flex-initial"
      @click="() => handleClick('created_at')"
    ></PrimaryButton>
  </div>
  <transition-group name="list" tag="div" class="space-y-4 px-4 md:px-0">
    <div v-for="todo in todos">
      <div class="flex justify-between">
        <TodoItem :todo="todo" @change="handleChange" :key="todo.id" />
        <SecondaryButton
          name="Move to List"
          class="text-xs leading-[15px]"
          @click="() => moveToList(todo.id)"
        />
      </div>
    </div>
  </transition-group>
</template>
