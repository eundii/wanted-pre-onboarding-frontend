import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../src/scss/styles.scss";

import Home from "./pages/Home";
import PageSignup from "./pages/PageSignup";
import PageSignin from "./pages/PageSignin";
import TodoList from "./pages/TodoList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
