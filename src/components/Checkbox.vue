<script lang="ts" setup>
interface IProps {
  checked: boolean
  name: string
}

const { checked, name } = defineProps<IProps>()
const emit = defineEmits<{
  (e: "change", event: Event): void
}>()
const handleChange = (event: Event) => {
  emit("change", event)
}
</script>

<template>
  <input
    :checked="checked"
    :name="name"
    @change="handleChange"
    type="checkbox"
  />
</template>

<style scoped>
input[type="checkbox"]:checked {
  background-image: url("../assets/check.svg");
  @apply bg-primary border-gray-100;
}

input[type="checkbox"] {
  @apply relative w-6 h-6 mr-2 rounded-full border transition outline-none border-gray-400;
  appearance: "none";
  -webkit-appearance: none;
}
</style>
