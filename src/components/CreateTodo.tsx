import { type TodoTitle } from '../types'
import { useState } from 'react'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState<TodoTitle>({ title: '' })

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && inputValue.title !== '') {
      saveTodo(inputValue)
      setInputValue({ title: '' })
    }
  }
  return (
      <input
      value={inputValue.title}
      onChange={(event) => {
        console.log(event.target.value)
        setInputValue({ title: event.target.value })
      }}
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={handleKeyDown}
    />
  )
}
