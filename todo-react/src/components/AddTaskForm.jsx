import Button from "./Button";
import Field from "./Field";

const AddTaskForm = (props) => {
  const{
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = props

  const onSubmit = (e) => {
    e.preventDefault()
    addTask()
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field 
        className="todo__field"
        labal="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={(e) => setNewTaskTitle(e.target.value)}
        ref={newTaskInputRef}
      />
      <Button type="submit"> Add </Button>
    </form>
  );
};

export default AddTaskForm;