import {
  React,
  useState,
  createContext,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import PageSignup from "./pages/PageSignup";
import PageSignin from "./pages/PageSignin";
import TodoList from "./pages/TodoList";
import axios from "axios";
import { BASE_URL } from "./api/baseUrl";

export const StateContext = createContext();
export const DispatchContext = createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case "GET":
      return action.data;
    case "CREATE":
      return state.concat(action.data);
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "EDIT":
      return state.map((item) =>
        item.id === action.id ? { ...item, todo: action.data } : item
      );
    case "TOGGLE":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, idCopmleted: !action.isCompleted }
          : item
      );
    default:
      return state;
  }
}

function App() {
  const token = localStorage.getItem("Token");

  const [data, dispatch] = useReducer(todoReducer, []);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "GET", data: response.data });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        console.log(response);
        dispatch({
          type: "CREATE",
          data: {
            id: response.data.id,
            todo,
            isCompleted: response.data.isCompleted,
            userId: response.data.userId,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const onRemove = useCallback((id) => {
  //   dispatch({ type: "REMOVE", id });
  // }, []);

  // const onEdit = useCallback((id, todo) => {
  //   dispatch({ type: "EDIT", id, todo });
  // }, []);

  // const onToggle = useCallback((id, isCompleted) => {
  //   dispatch({ type: "TOGGLE", id, isCompleted });
  // }, []);

  const memoizedDispatches = useMemo(() => {
    // return { onCreate, onRemove, onEdit, onToggle };
    return { onCreate, getTodos };
  }, []);

  useEffect(() => {
    getTodos(token);
  }, []);

  return (
    <div className="App">
      <StateContext.Provider value={data}>
        <DispatchContext.Provider value={memoizedDispatches}>
          <BrowserRouter>
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
