import React from "react";
import "./App.css";

import axios from "axios";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import URL from "./URL";
import { PersoneList, PersoneInfo } from "./components/Persone.js";
import { ProjectList, ProjectDetail } from "./components/Project";
import LoginForm from "./components/Auth";
import TodoList from "./components/Todo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personeSet: [],
      projectSet: [],
      todoSet: [],
      token: "",
    };
  }

  getHeadr() {
    let header = {};
    header["Content-Type"] = "application/json";
    if (this.isAuth()) {
      header["Authorization"] = "Token " + this.state.token;
    }

    return header;
  }

  getToken(login, password) {
    axios
      .post(URL["backend_token_auth"], {
        username: login,
        password: password,
      })
      .then((response) => {
        this.setToken(response.data["token"]);
      })
      .catch(() => {
        alert("Wrong login or password");
      });
  }

  setToken(token) {
    const cookie = new Cookies();
    cookie.set("token", token);
    window.location.reload();
  }

  isAuth() {
    return this.state.token !== "";
  }

  logout() {
    this.setToken("");
    window.location.reload();
  }

  loadData() {
    const headers = this.getHeadr();
    const url = URL["backend"];
    const objs = ["persone", "project", "todo"];

    if(!this.isAuth()) {return;}

    objs.forEach((obj) => {
      axios
        .get(url + obj, { headers })
        .then((response) => {
          const req = {};
          req[obj + "Set"] = response.data["results"];
          this.setState(req);
        })
        .catch((error) => console.log(error));
    });
  }

  getTokenFromStorage() {
    const cookie = new Cookies();
    const token = cookie.get("token");
    this.setState({ token: token }, () => {
      this.loadData();
    });
  }

  componentDidMount() {
    this.getTokenFromStorage();
  }

  render() {
    let loginApi = {};
    let loginForm = null;
    let links = null;
    if (this.isAuth()) {
      loginForm = (
        <>
          <p>Welcome:</p>
          <button onClick={() => this.logout()}>Logout</button>
        </>
      );
      links = (
        <ul>
          <li>
            <Link to={URL["persone_all"]}>PersoneList</Link>
          </li>
          <li>
            <Link to={URL["project_all"]}>ProjectList</Link>
          </li>
          <li>
            <Link to={URL["todo_all"]}>TodoList</Link>
          </li>
        </ul>
      );
    } else {
      loginForm = (
        <LoginForm
          getToken={(username, password) => this.getToken(username, password)}
        />
      );
    }
    loginApi["isAuth"] = this.isAuth();
    loginApi["loginForm"] = loginForm;

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            (// home)
            <Route
              path={URL.home}
              element={
                <>
                  {loginForm}
                  <hr />
                  {links}
                  <hr />
                </>
              }
            />
            (// persone_all)
            <Route
              path={URL.persone_all}
              element={
                <>
                  <Menu state={URL.persone_all} loginForm={loginApi} />
                  <hr />
                  <PersoneList personeSet={this.state.personeSet} />
                  <hr />
                </>
              }
            />
            (// project_all)
            <Route
              path={URL.project_all}
              element={
                <>
                  <Menu state={URL.persone_all} loginForm={loginApi} />
                  <hr />
                  <ProjectList projectSet={this.state.projectSet} />
                  <hr />
                </>
              }
            />
            (// todo_all)
            <Route
              path={URL.todo_all}
              element={
                <>
                  <Menu state={URL.todo_all} loginForm={loginApi} />
                  <hr />
                  <TodoList todoSet={this.state.todoSet} />
                  <hr />
                </>
              }
            />
            <Route
              path={URL.project_all}
              element={
                <>
                  <Menu state={URL.project_all} loginForm={loginApi} />
                  <hr />
                  <ProjectList projectSet={this.state.projectSet} />
                  <hr />
                </>
              }
            />
            (// persone_id)
            <Route
              path={URL.persone_id}
              element={
                <>
                  <Menu state={URL.persone_id} loginForm={loginApi} />
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
                  <Menu state={URL.persone_project_all} loginForm={loginApi} />
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
                  <Menu state={URL.persone_project_id} loginForm={loginApi} />
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
                  <Menu state={URL.persone_todo_all} loginForm={loginApi} />
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
