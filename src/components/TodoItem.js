import React from "react";

function TodoItem({ todo, isCompleted }) {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>{todo}</span>
      </label>
      <div className="btn-area">
        <button data-testid="modify-button">수정</button>
        <button data-testid="delete-button">삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;
