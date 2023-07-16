import { Todo } from './Todo'
import type { TodoId, Todo as TodoType } from '../../types'
import { useState } from 'react'
import { styled } from 'styled-components'

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
    <TodoMain className='main'>
    <TodoList className='todo-list'>
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
    </TodoList>
    </TodoMain>
  )
}

const TodoMain = styled.main`
  position: relative;
  z-index: 2;
  border-top: 2px solid #e6e6e6;
`
const TodoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  .toggle:focus+label {
  box-shadow: 0 0 2px 2px #00ff00;
  outline: 0;
  }
  li {
  position: relative;
  font-size: 18px;
  border-bottom: 1px solid #ededed;
  }
  li:last-child {
  border-bottom: none;
  }
  li.editing {
  border-bottom: none;
  padding: 0;
  }
  li.editing .edit {
  font-size: 20px;
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
  }

  li.editing .view {
  display: none;
  }

  li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  }

  li .toggle {
  opacity: 0;
  }
  li .toggle+label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
}

li .toggle:checked+label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
}
li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 600;
  color: #484848;
}

li.completed label {
  color: #949494;
  text-decoration: line-through;
}

li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #949494;
  transition: color 0.2s ease-out;
}

li .destroy:hover,
.todo-list li .destroy:focus {
  color: #C18585;
}

li .destroy:after {
  content: '×';
  display: block;
  height: 100%;
  line-height: 1.1;
}

li:hover .destroy {
  display: block;
}

li .edit {
  display: none;
}

li.editing:last-child {
  margin-bottom: -1px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  li .toggle {
    background: none;
    height: 40px;
  }
}
`
