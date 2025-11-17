import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import { jsx } from "react/jsx-runtime"

const Todo = () => {
  const [tasks, setTasks] = useState( () => {
     const savedTasks = localStorage.getItem('tasks')

     if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return  [
    {id: 'task-1',title: 'Купить мололока', isDone: false},
    {id: 'task-2',title: 'начать учить React', isDone: true},
  ]
  }
)

  const [newTaskTitle, setNewTaskTitle] = useState()

const [searchQuery, setSearchQuery] = useState('')

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure you want to delete all?')
    if (isConfirmed) {
      setTasks([])
    }
    console.log('deleted all Task')
  };

  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId) //фильтруем массив, работаем с копией массива
    )
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone}
        }
        //перебираем массив задач, если id совпадаем с переданным, возвращаем новый объект и меняем только состояние
        return task
      }) 
    )
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
    }
  };

  useEffect( () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]) //в массив зависимостей указываем tasks, чтобы следить за изменением состояния

  const clearSearchQuery = searchQuery.trim().toLowerCase()

  const filteredTasks = clearSearchQuery.length > 0 
    ? tasks.filter( ({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({isDone})=> isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
       tasks={tasks}
       filteredTasks={filteredTasks}
       onDeleteTaskButtonClick={deleteTask}
       ontoggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;