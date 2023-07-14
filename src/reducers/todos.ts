import { type FilterOption, type TodoList } from '../types'

type Action =
  | { type: 'INIT_TODOS', payload: { todos: TodoList } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'COMPLETED', payload: { id: string, completed: boolean } }
  | { type: 'FILTER_CHANGE', payload: { filter: FilterOption } }
  | { type: 'REMOVE', payload: { id: string } }
  | { type: 'ADD', payload: { title: string } }
  | { type: 'UPDATE_TITLE', payload: { id: string, title: string } }

interface State {
  sync: boolean
  todos: TodoList
  filterSelected: FilterOption
}

export const todosReducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_TODOS') {
    const { todos } = action.payload
    return {
      ...state,
      sync: false,
      todos
    }
  }

  if (action.type === 'CLEAR_COMPLETED') {
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => !todo.completed)
    }
  }

  if (action.type === 'COMPLETED') {
    const { id, completed } = action.payload
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }

        return todo
      })
    }
  }

  if (action.type === 'FILTER_CHANGE') {
    const { filter } = action.payload
    return {
      ...state,
      sync: true,
      filterSelected: filter
    }
  }

  if (action.type === 'REMOVE') {
    const { id } = action.payload
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => todo.id !== id)
    }
  }

  if (action.type === 'ADD') {
    const { title } = action.payload
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    return {
      ...state,
      sync: true,
      todos: [...state.todos, newTodo]
    }
  }

  if (action.type === 'UPDATE_TITLE') {
    const { id, title } = action.payload
    console.log('UPDATE_TITLE', id, title)

    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title
          }
        }

        return todo
      })
    }
  }

  return state
}
