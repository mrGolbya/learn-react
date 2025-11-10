import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
  } = props
  const hasTasks = true

  if(!hasTasks){
    return <div className="todo__empty-message"></div>
  }

  return(
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem 
          className="todo__item"
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
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