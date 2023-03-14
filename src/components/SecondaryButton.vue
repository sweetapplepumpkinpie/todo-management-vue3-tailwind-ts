<script lang="ts" setup>
import { ButtonHTMLAttributes } from "vue"

interface IProps {
  name: string
  class?: string
  disabled?: ButtonHTMLAttributes["disabled"]
  type?: ButtonHTMLAttributes["type"]
}

const { name } = withDefaults(defineProps<IProps>(), {
  type: "button",
  disabled: false,
})
const emit = defineEmits<{
  (e: "click"): void
}>()
const handleClick = () => {
  emit("click")
}
</script>

<template>
  <button
    class="px-3 py-2 text-primary rounded border hover:bg-gray-200 bg-white disabled:bg-gray-200"
    :class="class"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>
