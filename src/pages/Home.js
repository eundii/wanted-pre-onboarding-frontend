import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h2 className="title">Todo List를 만들어보세요.</h2>
      <Link to={"/todo"} className="btn">
        Todo List
      </Link>
    </div>
  );
}

export default Home;
