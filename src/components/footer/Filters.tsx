import { styled } from 'styled-components'
import { TODO_FILTERS } from '../../consts.js'
import { type FilterOption } from '../../types.js'

const FILTERS_BUTTONS = {
  [TODO_FILTERS.SHOW_ALL]: { label: 'All', href: `/?filter=${TODO_FILTERS.SHOW_ALL}` },
  [TODO_FILTERS.SHOW_ACTIVE]: { label: 'Active', href: `/?filter=${TODO_FILTERS.SHOW_ACTIVE}` },
  [TODO_FILTERS.SHOW_COMPLETED]: { label: 'Completed', href: `/?filter=${TODO_FILTERS.SHOW_COMPLETED}` }
} as const

interface Props {
  handleFilterChange: (filter: FilterOption) => void
  filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
}

export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
  const handleClick = (filter: FilterOption) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleFilterChange(filter)
  }

  return (
    <TodoFiltersUl className='filters'>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, label }]) => {
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={handleClick(key as FilterOption)}
              >
                {label}
              </a>
            </li>
          )
        })
      }
    </TodoFiltersUl>
  )
}

const TodoFiltersUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
  @media (max-width: 430px) {
  bottom: 10px;
}

li {
  display: inline;
}

li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

li a:hover {
  border-color: #abf7ab;
}

li a.selected {
  border-color: #00ff00;
}
`
