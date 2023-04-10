import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import TodoCreate from "../components/TodoCreate";
import { StateContext } from "../App";

function TodoList() {
  const navigate = useNavigate();

  const todoList = useContext(StateContext);

  useEffect(() => {
    const isToken = localStorage.getItem("Token");
    if (!isToken) {
      navigate("/signin", { replace: true });
    }
  }, []);

  return (
    <div>
      <ul className="todo-list">
        {todoList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </ul>
      <TodoCreate />
    </div>
  );
}

export default TodoList;
