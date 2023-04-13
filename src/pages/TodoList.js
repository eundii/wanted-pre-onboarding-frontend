import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import TodoCreate from "../components/TodoCreate";

import axios from "axios";
import { BASE_URL } from "../api/baseUrl";

export const StateContext = createContext();
export const DispatchContext = createContext();

function TodoList() {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true });
    } else {
      getTodos();
    }
  }, []);

  const getTodos = useCallback(() => {
    axios
      .get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setTodos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onCreate = useCallback((todo) => {
    axios
      .post(
        `${BASE_URL}/todos`,
        {
          todo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        getTodos();
        setTodos(todos.concat(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onRemove = useCallback((id) => {
    axios
      .delete(`${BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getTodos();
        setTodos((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onEdit = useCallback((id, todo, isCompleted) => {
    axios
      .put(
        `${BASE_URL}/todos/${id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        getTodos();
        setTodos((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  todo: response.todo,
                  isCompleted: response.isCompleted,
                }
              : item
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, getTodos, onRemove, onEdit };
  }, []);

  return (
    <StateContext.Provider value={todos}>
      <DispatchContext.Provider value={memoizedDispatches}>
        <div className="center-area">
          <h2 className="title">TODO</h2>
          <div className="center-area-inner">
            <div className="todo-area">
              {todos ? (
                <ul className="todo-list">
                  {todos.map((item) => (
                    <TodoItem key={item.id} {...item} />
                  ))}
                </ul>
              ) : null}
              <TodoCreate />
            </div>
          </div>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default TodoList;
