import { styled } from 'styled-components'
import { type TodoTitle } from '../../types'
import { useState } from 'react'
import { TodoEdit } from '../todos/Todo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState<TodoTitle>({ title: '' })

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && inputValue.title !== '') {
      onAddTodo(inputValue)
      setInputValue({ title: '' })
    }
  }
  return (
    <TodoInput
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

const TodoInput = styled(TodoEdit)`
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  padding: 16px 16px 16px 60px;
  height: 65px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`
