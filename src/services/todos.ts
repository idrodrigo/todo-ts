import { type TodoList } from '../types'

// const API_URL = 'https://api.jsonbin.io/v3/b/64b093bd9d312622a37f1986' // public
const API_URL = 'https://api.jsonbin.io/v3/b/64b092feb89b1e2299be9019' // private

interface Todo {
  id: string
  title: string
  completed: boolean
  order: number
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-ACCESS-KEY': import.meta.env.VITE_API_BIN_KEY
    }
  })
  if (!res.ok) {
    console.error('Error fetching todos')
    return []
  }

  const { record: todos } = await res.json() as { record: Todo[] }
  return todos
}

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
  // console.log(import.meta.env.VITE_API_BIN_KEY)
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'X-Master-Key': '$2b$10$J0Fy0FhXCqVRnIKh9gux4O0mLqeaO3PcNpTFJa6ArEORVJhtCiutu',
      // 'X-ACCESS-KEY': '$2b$10$aYgoDAwBn4n.LipCcWYnJeqJse/tbXodYMvTmE5Wv1h7c6qVwBQaS'
      'X-ACCESS-KEY': import.meta.env.VITE_API_BIN_KEY
    },
    body: JSON.stringify(todos)
  })

  return res.ok
}
