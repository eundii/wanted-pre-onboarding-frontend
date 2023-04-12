import React, { useContext, useEffect, useState } from "react";
import { DispatchContext } from "../App";

function TodoItem({ id, todo, isCompleted }) {
  const { onRemove, onEdit } = useContext(DispatchContext);
  const [isEdit, setIsEdit] = useState(false);

  const [localTodo, setLocalTodo] = useState(todo);
  const [localIsCompleted, setLocalIsCompleted] = useState(isCompleted);

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTodo(todo);
  };

  const handleEdit = () => {
    onEdit(id, localTodo, localIsCompleted);
    toggleIsEdit();
  };

  const handleCompleted = () => {
    setLocalIsCompleted(!localIsCompleted);
    onEdit(id, localTodo, !localIsCompleted);
  };

  return (
    <li>
      <div className="input-area">
        <label>
          <input
            type="checkbox"
            checked={localIsCompleted}
            onChange={handleCompleted}
          />
          {isEdit ? (
            <input
              data-testid="modify-input"
              value={localTodo}
              onChange={(e) => setLocalTodo(e.target.value)}
            />
          ) : (
            <span>{todo}</span>
          )}
        </label>
      </div>
      <div className="btn-area">
        {isEdit ? (
          <>
            <button data-testid="submit-button" onClick={handleEdit}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleQuitEdit}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={toggleIsEdit}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => onRemove(id)}>
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default React.memo(TodoItem);
