import { FILTERS_BUTTONS } from '../consts'
import { type FiltersValuesTodos } from '../types'

interface Props {
  filterSelected: FiltersValuesTodos
  onFilterChange: (filter: FiltersValuesTodos) => void
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange
}) => {
  return (
    <ul className="filters">
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { label, href }]) => {
          const className = filterSelected === key ? 'selected' : ''
          return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={(event) => {
                  event.preventDefault()
                  onFilterChange(key as FiltersValuesTodos)
                }}
              >
                {label}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
