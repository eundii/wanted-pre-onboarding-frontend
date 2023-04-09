import React from "react";

function TodoItem() {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>TODO 1</span>
      </label>
      <div className="btn-area">
        <button data-testid="modify-button">수정</button>
        <button data-testid="delete-button">삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;
