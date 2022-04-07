import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { getTodos, reset } from "../features/todos/todoSlice";
import React from "react"

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector((state) => state.todos);

  // Navigates user to login page if user is not logged in
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}!</h1>
        <p>Your Todo Dashboard</p>
      </section>

      <TodoForm />

      <section className="content">
        {todos.length > 0 ? (
          <div className="todos">
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        ) : (
          <h3>You have not set a todo</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
