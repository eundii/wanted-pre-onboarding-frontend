import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

function TodoList() {
  const navigate = useNavigate();

  const todos = [
    {
      id: 1,
      todo: "과제하기",
      isCompleted: false,
      userId: 1,
    },
  ];

  useEffect(() => {
    const isToken = localStorage.getItem("Token");
    if (!isToken) {
      navigate("/signin", { replace: true });
    }
  }, []);

  return (
    <div>
      <ul className="todo-list">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            todo={item.todo}
            userId={item.userId}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
      <div className="create-todo">
        <input data-testid="new-todo-input" />
        <button data-testid="new-todo-add-button">추가</button>
      </div>
    </div>
  );
}

export default TodoList;
