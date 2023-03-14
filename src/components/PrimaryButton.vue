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
    class="px-4 py-3 text-base leading-[18px] bg-primary hover:bg-primary/50 transition text-white rounded disabled:bg-gray-300"
    :class="class"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>
