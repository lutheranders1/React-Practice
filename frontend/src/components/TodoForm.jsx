import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todos/todoSlice";
import React from "react"

function TodoForm() {
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTodo({ todo }));
    setTodo("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Add a todo:</label>
          <input type="text" name="text" id="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
