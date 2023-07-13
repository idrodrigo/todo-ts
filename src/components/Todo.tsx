// export interface Props {
//   id: number
//   title: string
//   completed: boolean
// }
import { type TodoId, type Todo as TodoType } from '../types'
import { useState, useRef, useEffect } from 'react'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompledTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
  id, title, completed, onRemoveTodo, onToggleCompledTodo, setTitle, isEditing, setIsEditing
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleRemoveTodo = (): void => {
    onRemoveTodo({
      id
    })
  }

  const handleChangeCompledTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompledTodo({
      id,
      completed: event.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title })
      }

      if (editedTitle === '') onRemoveTodo({ id })
      setIsEditing('')
    }

    if (event.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        onChange={handleChangeCompledTodo}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={handleRemoveTodo}
      />
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </div>
  )
}
