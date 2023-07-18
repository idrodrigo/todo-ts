import { Todos } from './components/todos/Todos'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { useTodos } from './hooks/useTodos'
import { styled } from 'styled-components'
import { Info } from './components/Info'

export const App: React.FC = () => {
  const {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompletedTodo,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleUpdateTitle,
    todos: filteredTodos,
    isLoading
  } = useTodos()

  return (
    <>
      <TodoApp className='todoapp'>
        <Header onAddTodo={handleAddTodo} />
        <Todos
          onRemoveTodo={handleRemove}
          setCompleted={handleCompletedTodo}
          setTitle={handleUpdateTitle}
          todos={filteredTodos}
          isLoading={isLoading}
        />
        <Footer
          handleFilterChange={handleFilterChange}
          completedCount={completedCount}
          activeCount={activeCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
        />
      </TodoApp>
      <Info />
    </>
  )
}

const TodoApp = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
