import { Todos } from './components/todos/Todos'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { useTodos } from './hooks/useTodos'

const App: React.FC = () => {
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
    todos: filteredTodos
  } = useTodos()

  return (
    <>
      <div className='todoapp'>
        <Header onAddTodo={handleAddTodo} />
        <Todos
          onRemoveTodo={handleRemove}
          setCompleted={handleCompletedTodo}
          setTitle={handleUpdateTitle}
          todos={filteredTodos}
        />
        <Footer
          handleFilterChange={handleFilterChange}
          completedCount={completedCount}
          activeCount={activeCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
        />
      </div>
    </>
  )
}

export default App
