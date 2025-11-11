import Button from "./Button";
import Field from "./Field";

const AddTaskForm = (props) => {
  const{
    addTask,
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
      />
      <Button type="submit"> Add </Button>
    </form>
  );
};

export default AddTaskForm;