import Field from "./Field";

const SearchTaskForm = (props) => {
  const{
    onSearchInput,
  } = props

  return (
    <form className="todo__form">
        <Field 
          className="todo__field"
          labal="Search task"
          id="search-task"
          type="search"
          onInput={(e)=>onSearchInput(e.target.value)}
        />
      </form>
  );
};

export default SearchTaskForm;