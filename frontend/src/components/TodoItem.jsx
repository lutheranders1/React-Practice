import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";
import React from "react"

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div className="todo">
      <div>{new Date(todo.createdAt).toLocaleString("en-gb")}</div>
      <h2>{todo.todo}</h2>
      <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">
        X
      </button>
    </div>
  );
}

export default TodoItem;
