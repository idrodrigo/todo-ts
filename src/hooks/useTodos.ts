import { useEffect, useReducer, useState } from 'react'
import { TODO_FILTERS } from '../consts'
import { fetchTodos, updateTodos } from '../services/todos'
import { type TodoList, type FilterOption, type TodoTitle, type Todo as TodoType, type TodoId } from '../types'
import { todosReducer } from '../reducers/todos'

const initialState = {
  sync: false,
  todos: [],
  filterSelected: (() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterOption | null
    if (filter === null) return TODO_FILTERS.SHOW_ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.SHOW_ALL
  })()
}

export const useTodos = (): {
  isLoading: boolean
  activeCount: number
  completedCount: number
  todos: TodoList
  filterSelected: FilterOption
  handleClearCompleted: () => void
  handleCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  handleFilterChange: (filter: FilterOption) => void
  handleRemove: ({ id }: TodoId) => void
  handleAddTodo: ({ title }: TodoTitle) => void
  handleUpdateTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
} => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(todosReducer, initialState)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleCompletedTodo = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    dispatch({ type: 'COMPLETED', payload: { id, completed } })
  }

  const handleRemove = ({ id }: TodoId): void => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  const handleUpdateTitle = ({ id, title }: Pick<TodoType, 'id' | 'title'>): void => {
    dispatch({ type: 'UPDATE_TITLE', payload: { id, title } })
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    dispatch({ type: 'ADD', payload: { title } })
  }

  const handleClearCompleted = (): void => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const handleFilterChange = (filter: FilterOption): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: { filter } })

    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.SHOW_ACTIVE) {
      return !todo.completed
    }

    if (filterSelected === TODO_FILTERS.SHOW_COMPLETED) {
      return todo.completed
    }

    return true
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  useEffect(() => {
    setIsLoading(true)
    fetchTodos()
      .then(todos => {
        dispatch({ type: 'INIT_TODOS', payload: { todos } })
      })
      .catch(err => { console.error(err) })
      .finally(() => {
        setIsLoading(false)
      }
      )
  }, [])

  useEffect(() => {
    if (sync) {
      updateTodos({ todos }).catch(err => { console.error(err) })
    }
  }, [todos, sync])

  return {
    isLoading,
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompletedTodo,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleUpdateTitle,
    todos: filteredTodos
  }
}
