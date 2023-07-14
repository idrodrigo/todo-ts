import { useEffect, useRef, useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../../types'

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
        <button className='destroy' onClick={() => { onRemoveTodo({ id }) }}></button>
      </div>

      <input
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
