import { type TodoId, type ListOfTodos, type Todo as TodoType } from '../types'
import { Todo } from './Todo'
import { useState } from 'react'

export interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompledTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todos: React.FC<Props> = ({
  todos, onRemoveTodo, onToggleCompledTodo, setTitle
}) => {
  const [isEditing, setIsEditing] = useState('')
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''} 
            ${isEditing === todo.id ? 'editing' : ''}
          `} >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompledTodo={onToggleCompledTodo}
            setTitle={setTitle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
