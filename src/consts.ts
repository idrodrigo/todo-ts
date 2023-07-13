export const TODO_FILTERS = {
  SHOW_ALL: 'show_all',
  SHOW_ACTIVE: 'show_active',
  SHOW_COMPLETED: 'show_completed'
} as const

export const FILTERS_BUTTONS = {
  [TODO_FILTERS.SHOW_ALL]: {
    label: 'All',
    href: `/?filter=${TODO_FILTERS.SHOW_ALL}`
  },
  [TODO_FILTERS.SHOW_ACTIVE]: {
    label: 'Active',
    href: `/?filter=${TODO_FILTERS.SHOW_ACTIVE}`
  },
  [TODO_FILTERS.SHOW_COMPLETED]: {
    label: 'Completed',
    href: `/?filter=${TODO_FILTERS.SHOW_COMPLETED}`
  }
} as const
