import { useEffect, useRef, useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../../types'
import { styled } from 'styled-components'

interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: { id: string, title: string }) => void
  isEditing: string
  setIsEditing: (completed: string) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  setCompleted,
  setTitle,
  onRemoveTodo,
  isEditing,
  setIsEditing
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo({ id })

      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { setCompleted({ id, completed: e.target.checked }) }}
        />
        <label>{title}</label>
        <TodoButton className='destroy' onClick={() => { onRemoveTodo({ id }) }}></TodoButton>
      </div>

      <TodoEdit
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}

export const TodoEdit = styled.input`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 2px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:focus {
  box-shadow: 0 0 2px 2px #1ED760;
  outline: 0;
  }
`
export const TodoButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
