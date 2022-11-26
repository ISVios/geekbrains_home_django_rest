import React from "react";
import { Link, useParams } from "react-router-dom";

import URL from "../URL";

const Menu = (props) => {
  const { loginForm } = props;
  const { state } = props;
  const params = useParams();
  let menu = null;
  switch (state) {
    case URL.home:
    case URL.todo_all:
    case URL.persone_all:
    case URL.project_all:
      menu = (
        <>
          ||
          <Link to={URL["persone_all"]}>PersoneList</Link>
          ||
          <Link to={URL["project_all"]}>ProjectList</Link>
          ||
          <Link to={URL["todo_all"]}>TodoList</Link>
          ||
          <br />
          {loginForm.loginForm}
        </>
      );
      break;
    case URL.persone_id:
      const { persone_pk } = params;
      menu = (
        <>
          ||
          <Link to={URL["persone_all"]}>PersoneList</Link>
          ||
          <Link to={URL["project_all"]}>ProjectList</Link>
          ||
          <Link to={URL["todo_all"]}>TodoList</Link>
          ||
          <br />
          ||
          <Link to={"/persone/" + persone_pk + "/project_all"}>
            CurrentUserProjectList
          </Link>
          ||
          <Link to={"/persone/" + persone_pk + "/todo_all"}>
            CurrentUserTodoList
          </Link>
          ||
          <br />
          {loginForm.loginForm}
        </>
      );
      break;
    default:
      menu = null;
  }
  return menu;
};

export default Menu;
