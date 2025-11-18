import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const {
    tasks = [],
    filteredTasks,
    onDeleteTaskButtonClick,
    ontoggleTaskCompleteChange,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = props

  const hasTasks = tasks.length>0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if(!hasTasks){
    return <div className="todo__empty-message">There are no tasks yet</div>
  }

  if(hasTasks && isEmptyFilteredTasks){
    return <div className="todo__empty-message">No tasks found for your search</div>
  }

  return(
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem 
          className="todo__item"
          key={task.id}
          ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          ontoggleTaskCompleteChange={ontoggleTaskCompleteChange}
          /*id={task.id}
          title={task.title}
          isDone={task.isDone} или использовать spread*/
          {...task}
        />  
      ))}
        
    </ul>
  )
};

export default TodoList;