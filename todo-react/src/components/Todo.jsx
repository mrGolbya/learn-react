import { useState, useEffect, useRef } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

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

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find( ({isDone}) => !isDone)?.id

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
    // const newTaskTitle = newTaskInputRef.current.value

    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      // newTaskInputRef.current.value = ''
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  };

  useEffect( () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]) //в массив зависимостей указываем tasks, чтобы следить за изменением состояния

  useEffect( () => {
    newTaskInputRef.current.focus()
  }, [])

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
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Button 
        onClick={()=>firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
      >
        Show first incomplete task
      </Button>
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({isDone})=> isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
       tasks={tasks}
       firstIncompleteTaskRef={firstIncompleteTaskRef}
       firstIncompleteTaskId={firstIncompleteTaskId}
       filteredTasks={filteredTasks}
       onDeleteTaskButtonClick={deleteTask}
       ontoggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;