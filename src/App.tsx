import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoTitle, type FiltersValuesTodos, type TodoId, type Todo as TodoType } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'learn react and typescript',
    completed: false
  },
  {
    id: '2',
    title: 'add tests to the app',
    completed: true
  },
  {
    id: '3',
    title: 'deploy the app to github pages',
    completed: false
  }
]

export default function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FiltersValuesTodos>(TODO_FILTERS.SHOW_ALL)

  const handleRemoveTodo = ({ id }: TodoId): void => {
    console.log(`remove todo with id: ${id}`)
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FiltersValuesTodos): void => {
    console.log(`filter changed to: ${filter}`)
    setFilterSelected(filter)
  }

  const handleCompleteTodo = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    console.log(`complete todo with id: ${id} and completed: ${completed.toString()}`)
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleClearAllCompleted = (): void => {
    console.log('clear all completed todos')
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCountTodos = todos.filter(todo => !todo.completed).length
  const completedCountTodos = todos.length - activeCountTodos

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.SHOW_ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.SHOW_COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    console.log(`add todo with title: ${title}`)
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const handleUpdateTitle = (
    { id, title }: Pick<TodoType, 'id' | 'title'>
  ): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return (
    <>
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo } />
      <Todos
        onToggleCompledTodo={handleCompleteTodo}
        onRemoveTodo={handleRemoveTodo}
        todos={filteredTodos}
        setTitle={handleUpdateTitle}
      />

      <Footer
        filterSelected={filterSelected}
        activeCountTodos={activeCountTodos}
        onClearCompleted={handleClearAllCompleted}
        completedCountTodos={completedCountTodos}
        handleFilterChange={handleFilterChange } />
    </div>
    </>
  )
}
