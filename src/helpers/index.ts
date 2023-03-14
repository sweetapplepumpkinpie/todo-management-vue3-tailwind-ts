import { TTodo } from "./../types/index"

export const sortTodoByField = (
  a: TTodo,
  b: TTodo,
  field: keyof TTodo
): number => {
  return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
}
