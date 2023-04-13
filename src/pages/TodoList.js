import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import TodoCreate from "../components/TodoCreate";
import { DispatchContext, StateContext } from "../App";

function TodoList() {
  const navigate = useNavigate();
  const { getTodos } = useContext(DispatchContext);

  const todoList = useContext(StateContext);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/signin", { replace: true });
    } else {
      getTodos(token);
    }
  }, []);

  return (
    <div className="center-area">
      <h2 className="title">TODO</h2>
      <div className="center-area-inner">
        <div className="todo-area">
          {todoList ? (
            <ul className="todo-list">
              {todoList.map((item) => (
                <TodoItem key={item.id} {...item} />
              ))}
            </ul>
          ) : null}
          <TodoCreate />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
