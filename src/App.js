import { React, useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import PageSignup from "./pages/PageSignup";

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
              </Routes>
            </div>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
