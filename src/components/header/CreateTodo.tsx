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
  color: #2D79C7;
  padding: 16px 16px 16px 60px;
  height: 65px;
  border: none;
  background: rgba(180, 17, 17, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  &::placeholder {
    color: #2D79C7;
  }
  &:focus {
  box-shadow: 0 0 2px 2px #1ED760;
  outline: 0;
  }
`
