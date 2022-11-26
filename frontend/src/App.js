import React from "react";
import "./App.css";

import axios from "axios";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import URL from "./URL";
import { PersoneList, PersoneInfo } from "./components/Persone.js";
import { ProjectList, ProjectDetail } from "./components/Project";
import LoginForm from "./components/Auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personeSet: [],
      projectSet: [],
      todoSet: [],
    };
  }

  componentDidMount() {
    const url = URL["backend"];
    const objs = ["persone", "project", "todo"];

    objs.forEach((obj) => {
      axios
        .get(url + obj)
        .then((response) => {
          const req = {};
          req[obj + "Set"] = response.data["results"];
          this.setState(req);
        })
        .catch((error) => console.log(error));
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            (// home)
            <Route
              path={URL.home}
              element={
                <>
                  <Menu state={URL.home} />
                  <hr />
                  SOME LOGIN FORM
                  <LoginForm />
                  <hr />
                </>
              }
            />
            (// persone_all DELETE IN NEXT LESSON)
            <Route
              path={URL.persone_all}
              element={
                <>
                  <Menu state={URL.persone_all} />
                  <hr />
                  <PersoneList personeSet={this.state.personeSet} />
                  <hr />
                </>
              }
            />
            (// persone_id)
            <Route
              path={URL.persone_id}
              element={
                <>
                  <Menu state={URL.persone_id} />
                  <hr />
                  <PersoneInfo personeSet={this.state.personeSet} />
                  <hr />
                  <ProjectList projectSet={this.state.projectSet} />
                  <hr />
                </>
              }
            />
            (// persone_project_all)
            <Route
              path={URL.persone_project_all}
              element={
                <>
                  <Menu state={URL.persone_project_all} />
                  <hr />
                  <ProjectList projectSet={this.state.projectSet} />
                  <hr />
                </>
              }
            />
            (// persone_project_id)
            <Route
              path={URL.persone_project_id}
              element={
                <>
                  <Menu state={URL.persone_project_id} />
                  <hr />
                  <ProjectDetail
                    projectSet={this.state.projectSet}
                    todoSet={this.state.todoSet}
                  />
                  <hr />
                </>
              }
            />
            (// persone_todo_all)
            <Route
              path={URL.persone_todo_all}
              element={
                <>
                  <Menu state={URL.persone_todo_all} />
                  <hr />
                  Persone all Todo
                  <hr />
                </>
              }
            />
            (// persone_todo_id NEED just for command put update) (// 404 MUST
            BE LAST)
            <Route
              path="*"
              element={
                <>
                  <Menu state={""} />
                  <hr />
                  WRONG WAY
                  <hr />
                </>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
