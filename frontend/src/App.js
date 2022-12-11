import React from "react";
import "./App.css";

import axios from "axios";
import {
  Route,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Cookies from "universal-cookie";

import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import URL from "./URL";
import { PersoneList, PersoneInfo } from "./components/Persone.js";
import {
  ProjectList,
  ProjectDetail,
  CurrentUserProjectList,
} from "./components/Project";
import LoginForm from "./components/Auth";
import TodoList from "./components/Todo";

import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personeSet: [],
      projectSet: [],
      todoSet: [],
      token: "",
      me: null,
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
        this.setToken(response.data["token"], login);
      })
      .catch(() => {
        alert("Wrong login or password");
      });
  }

  setToken(token, login) {
    const cookie = new Cookies();
    cookie.set("token", token);
    window.location.reload();
  }

  addTodo(project, persone, text, close) {
    const headers = this.getHeadr();
    const data = {
      project: project,
      persone: persone,
      content: text,
      active: close,
    };
    axios
      .post(URL.todo_add, data, { headers })
      .then((response) => {
        const newTodo = response.data;
        this.setState({ todoSet: [...this.state.todoSet, newTodo] });
      })
      .catch((error) => console.error(error));
  }

  openTodoForm(todo, cmd = "add") {
    this.props.history.push(URL.todo_form);
  }

  filterProjectByName(name) {
    if (!name || name.lenght === 0 || name.trim() === "") {
      return this.state.projectSet;
    }

    const headers = this.getHeadr();
    let filtered = this.state.projectSet;
    axios
      .get(URL.project_filter_by_name(name), { headers })
      .then((response) => {
        filtered = response.data.results;
      })
      .catch((error) => console.error(error));
    return filtered;
  }

  addProject(name, persones) {
    const headers = this.getHeadr();
    const data = { name: name, persones: persones };
    console.log(data);
    axios
      .post(URL.project_add, data, { headers })
      .then((response) => {
        const newProject = response.data;
        this.setState({ projectSet: [...this.state.projectSet, newProject] });
      })
      .catch((error) => console.error(error));
  }

  deleteProject(project, whoDel) {
    const headers = this.getHeadr();
    axios
      .delete(URL.project_del(project.pk), { headers })
      .then((response) => {
        this.setState(
          this.state.projectSet.filter((elem) => elem.pk !== project.pk)
        );
        window.location.reload();
      })
      .catch((error) => console.error(error));
  }

  deleteTodo(id) {
    const headers = this.getHeadr();
    axios
      .delete(URL.todo_del(id), { headers })
      .then(() => {
        this.setState({
          todoSet: this.state.todoSet.filter((elem) => elem.id !== id),
        });
        window.location.reload();
      })
      .catch((error) => console.error(error));
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

    if (!this.isAuth()) {
      return;
    }

    axios.get("http://127.0.0.1:8000/getMe/", { headers }).then((response) => {
      this.setState({ me: response.data }, () => {
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
      });
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

    const firstName = this.state.me ? this.state.me.firstName : null;
    if (this.isAuth()) {
      loginForm = (
        <>
          <p>Welcome: {firstName}</p>
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

    const projectFormWithParam = this.state.me && (
      <ProjectForm
        me={this.state.me}
        personeSet={this.state.personeSet}
        addClb={(name, persones) => this.addProject(name, persones)}
      />
    );

    const todoFormWithParam = (
      <TodoForm
        addClb={(project, persone, text, close) =>
          this.addTodo(project, persone, text, close)
        }
        key={URL.todo_form}
        me={this.state.me}
        projectSet={this.state.projectSet}
      />
    );

    if (!this.isAuth()) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <h2>Please Login</h2>
                  {loginForm}
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      );
    }

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
                  <ProjectList
                    filterProjectByName={(name) =>
                      this.filterProjectByName(name)
                    }
                    projectSet={this.state.projectSet}
                  />
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
                  <TodoList
                    todoForm={(todo, cmd) => this.openTodoForm(todo, cmd)}
                    deleteClb={(id) => this.deleteTodo(id)}
                    todoSet={this.state.todoSet}
                  />
                  {this.state.me && (
                    <TodoForm
                      addClb={(project, persone, text, close) =>
                        this.addTodo(project, persone, text, close)
                      }
                      key={URL.todo_form}
                      me={this.state.me}
                      projectSet={this.state.projectSet}
                      personeSet={this.state.personeSet}
                    />
                  )}
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
                  <CurrentUserProjectList
                    addProjectForm={projectFormWithParam}
                    projectSet={this.state.projectSet}
                    deleteProjectClb={(project) =>
                      this.deleteProject(project, null)
                    }
                  />
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
                  <CurrentUserProjectList
                    projectSet={this.state.projectSet}
                    todoSet={this.state.todoSet}
                  />
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
            (// URL.todo_form)
            <Route
              path={URL.todo_form}
              element={<>{this.state.me && { todoFormWithParam }}</>}
            />
            (// persone_todo_all DELETE ???)
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
            (// 404 MUST BE LAST)
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
