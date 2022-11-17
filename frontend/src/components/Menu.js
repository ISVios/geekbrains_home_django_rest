import React from "react";
import { Link, useParams } from "react-router-dom";

import URL from "../URL";

const Menu = ({ state }) => {
  const params = useParams();
  let menu = null;
  switch (state) {
    case URL.home:
    case URL.persone_all:
      menu = "LOGIN";
      break;
    case URL.persone_id:
      const { persone_pk } = params;
      menu = (
        <>
          ||
          <Link path={"/persone/" + persone_pk + "/project_all"}>
            ProjectList
          </Link>
          ||
          <Link path={"/persone/" + persone_pk + "/todo_all"}>TodoList</Link>||
        </>
      );
      break;
    default:
      menu = null;
  }
  return menu;
};

export default Menu;
