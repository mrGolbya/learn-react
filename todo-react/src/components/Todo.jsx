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
    console.log('deleted all Task')
  };

  const deleteTask = (taskId) => {
    console.log(`удаляем задачу с id: ${taskId}`)
  };

  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена!!!'}`)
  };

  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`)
  };
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm/>
      <SearchTaskForm 
        onSearchInput={filterTasks}
      />
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({isDone})=> isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
       tasks={tasks}
       onDeleteTaskButtonClick={deleteTask}
       ontoggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;