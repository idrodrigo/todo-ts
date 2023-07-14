import { Todo } from './Todo'
import type { TodoId, Todo as TodoType } from '../../types'
import { useState } from 'react'

interface Props {
  todos: TodoType[]
  setCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  setCompleted,
  setTitle,
  onRemoveTodo
}) => {
  const [isEditing, setIsEditing] = useState('')

  return (
    <ul className='todo-list'>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            setTitle={setTitle}
            onRemoveTodo={onRemoveTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
