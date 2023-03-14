<script lang="ts" setup>
import { TTodo } from "../types"
import Checkbox from "./Checkbox.vue"
import { EStatus } from "../types"

interface IProps {
  todo: TTodo
  done?: boolean
}

const { todo } = withDefaults(defineProps<IProps>(), { done: false })
const emit = defineEmits<{
  (e: "change", event: Event): void
}>()
const handleChange = (event: Event) => {
  emit("change", event)
}
</script>

<template>
  <div class="flex">
    <Checkbox
      :name="todo.id.toString()"
      :checked="todo.status === EStatus.DONE"
      @change="handleChange"
    />
    <div>
      <div class="text-base" :class="{ 'text-gray-300 line-through': done }">
        {{ todo.name }}
      </div>
      <div class="text-sm text-gray-300">{{ todo.name }}</div>
    </div>
  </div>
</template>
