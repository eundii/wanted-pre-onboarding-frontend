import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../pages/TodoList";

function TodoCreate() {
  const { onCreate } = useContext(DispatchContext);

  const todoInput = useRef();
  const [state, setState] = useState({
    todo: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      todo: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.todo.length < 1) {
      alert("한 글자 이상 입력해주세요.");
      todoInput.current.focus();
      return;
    }
    onCreate(state.todo);
    setState({
      todo: "",
    });
  };

  return (
    <div className="create-todo">
      <input
        data-testid="new-todo-input"
        ref={todoInput}
        name="todo"
        placeholder="할 일을 입력하세요."
        value={state.todo}
        onChange={handleChangeState}
      />
      <button
        data-testid="new-todo-add-button"
        className="btn large"
        onClick={handleSubmit}
      >
        추가
      </button>
    </div>
  );
}

export default React.memo(TodoCreate);
