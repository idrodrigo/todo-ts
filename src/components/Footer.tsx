import { type FiltersValuesTodos } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCountTodos: number
  onClearCompleted: () => void
  completedCountTodos: number
  filterSelected: FiltersValuesTodos
  handleFilterChange: (filter: FiltersValuesTodos) => void
}

export const Footer: React.FC<Props> = ({
  activeCountTodos = 0,
  completedCountTodos = 0,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCountTodos}</strong> item left
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {completedCountTodos > 0 && (
      <button
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
      )}
    </footer>
  )
}
