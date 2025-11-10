import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {
  const tasks = [
    {id: 'task-1',title: 'Купить мололока', isDone: false},
    {id: 'task-2',title: 'начать учить React', isDone: true},
  ]

  const deleteAllTasks = () => {
    console.log('delet all Task')
  };

  const deleteTask = (taskId) => {
    console.log(`удаляем задачу с id: ${taskId}`)
  };
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm/>
      <SearchTaskForm />
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({isDone})=> isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
       tasks={tasks}
       onDeleteTaskButtonClick={deleteTask}
      />
    </div>
  );
};

export default Todo;