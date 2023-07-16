import { styled } from 'styled-components'
import { type TodoTitle } from '../../types'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header>
      <Todoh1>
        ToDo
        <img
          style={{ width: '60px', height: 'auto' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'
        />
      </Todoh1>
      <CreateTodo onAddTodo={onAddTodo} />
    </header>

  )
}

const Todoh1 = styled.h1`
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 80px;
  font-weight: 400;
  text-align: center;
  color: yellowgreen;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`
