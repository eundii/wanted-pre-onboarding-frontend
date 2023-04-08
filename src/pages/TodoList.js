import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem("Token");
    if (!isToken) {
      navigate("/signin", { replace: true });
    }
  }, []);

  return <div>TodoList</div>;
}

export default TodoList;
