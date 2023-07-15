import { styled } from 'styled-components'
import { type FilterOption } from '../../types'
import { Filters } from './Filters'
import { TodoButton } from '../todos/Todo'

interface Props {
  handleFilterChange: (filter: FilterOption) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  filterSelected: FilterOption
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  return (
    <>
    <TodoFooter className="footer">

      <TodoCount className="todo-count">
        <strong>{activeCount}</strong> item{activeCount !== 1 && 's'} left
      </TodoCount>

      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />

      {
        completedCount > 0 && (
          <>
          <ClearButton
            className="clear-completed"
            onClick={onClearCompleted}>
              Clear completed
          </ClearButton>
          </>
        )
      }
    </TodoFooter>
    </>
  )
}

const TodoFooter = styled.footer`
padding: 10px 15px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  border-top: 2px solid #e6e6e6;
  @media (max-width: 430px) {
    height: 50px;
  }
&:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
`
const TodoCount = styled.span`
  float: left;
  text-align: left;
strong {
  font-weight: 300;
}
`
const ClearButton = styled(TodoButton)`
  float: right;
  position: relative;
  line-height: 19px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
  text-decoration: underline;
  }
`
