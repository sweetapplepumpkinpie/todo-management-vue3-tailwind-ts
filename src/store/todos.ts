import { sortTodoByField } from "./../helpers/index"
import { defineStore } from "pinia"

import { EStatus, TTodo } from "./../types/index"

type TTodosState = {
  todos: TTodo[] | undefined
  todo: TTodo | undefined
  isLoading: boolean
  lastId: number
}

const initialState: TTodosState = {
  todos: undefined,
  todo: undefined,
  isLoading: false,
  lastId: 0,
}

export const useTodosStore = defineStore("todos", {
  state: () => initialState,
  getters: {
    backedTodos: (state: TTodosState): TTodo[] =>
      state.todos?.filter((todo) => todo.status === EStatus.BACKED) ?? [],
    doneTodos: (state: TTodosState): TTodo[] =>
      state.todos?.filter((todo) => todo.status === EStatus.DONE) ?? [],
    undoneTodos: (state: TTodosState): TTodo[] =>
      state.todos?.filter((todo) => todo.status === EStatus.INITIAL) ?? [],
  },
  actions: {
    async addTodo(name: string) {
      this.lastId = this.lastId + 1
      const newTodo: TTodo = {
        name,
        created_at: new Date(),
        status: EStatus.INITIAL,
        id: this.lastId,
      }

      this.todos = this.todos ? [...this.todos, newTodo] : [newTodo]
    },
    async updateTodo(id: number, status: EStatus) {
      this.todos = this.todos?.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status,
          }
        }
        return todo
      })
    },
    async deleteTodo(id: number) {
      this.todos = this.todos?.filter((todo) => todo.id !== id)
    },
    async getTodo(id: number) {
      this.todo = this.todos?.find((todo) => todo.id === id)
    },
  },
})
