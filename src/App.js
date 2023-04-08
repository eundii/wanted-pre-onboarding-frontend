import { React, useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import PageSignup from "./pages/PageSignup";
import PageSignin from "./pages/PageSignin";
import TodoList from "./pages/TodoList";

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <StateContext.Provider value={data}>
        <DispatchContext.Provider value={[]}>
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
