import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import { jsx } from "react/jsx-runtime"

const Todo = () => {
  const [tasks, setTasks] = useState([
    {id: 'task-1',title: 'Купить мололока', isDone: false},
    {id: 'task-2',title: 'начать учить React', isDone: true},
  ])

  const [newTaskTitle, setNewTaskTitle] = useState()

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

  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`)
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
    }
  };

  useEffect( () => {
    console.log('компонент Todo смонтирован, загружаем в tasks данные из хранилища')
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect( () => {
    console.log('Сохраняем данные в хранилище, т.к. изменился tasks', tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]) //в массив зависсимостей указываем tasks, чтобы следить за ьизменением состояния



  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
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