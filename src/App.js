import {
  React,
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../src/scss/styles.scss";

import Home from "./pages/Home";
import PageSignup from "./pages/PageSignup";
import PageSignin from "./pages/PageSignin";
import TodoList from "./pages/TodoList";
import axios from "axios";
import { BASE_URL } from "./api/baseUrl";
import Header from "./components/Header";

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const token = localStorage.getItem("Token");

  const [todos, setTodos] = useState([]);

  const getTodos = useCallback((token) => {
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
        getTodos(token);
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
        getTodos(token);
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
        getTodos(token);
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

  useEffect(() => {
    if (token) {
      getTodos(token);
    }
  }, []);

  return (
    <div className="App">
      <StateContext.Provider value={todos}>
        <DispatchContext.Provider value={memoizedDispatches}>
          <BrowserRouter>
            <Header />
            <div className="container">
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/signup" element={<PageSignup />} />
                <Route path="/signin" element={<PageSignin />} />
                <Route path="/todo" element={<TodoList />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
