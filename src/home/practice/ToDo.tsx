import { ChangeEvent, FormEvent, useState } from "react";

const ToDo = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<string>>([]);
  const onChangeTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((todo) => (todo = e.target.value));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    setTodoList((currentList) => [...currentList, todo]);
    setTodo("");
  };
  return (
    <>
      <h3>To Do List</h3>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChangeTodoInput}
          type='text'
          placeholder='write to do'
        />
        <button>Add To Do</button>
      </form>
      <ol>
        {todoList.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </>
  );
};

export default ToDo;
