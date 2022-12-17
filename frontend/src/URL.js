const URL = {};

const URL_PORT = "8080";

//backend get
URL["backend"] = "http://127.0.0.1:" + URL_PORT + "/api/";
URL["backend_token_auth"] = "http://127.0.0.1:" + URL_PORT + "/api-token-auth/";

//backend post
URL["todo_add"] = "http://127.0.0.1:" + URL_PORT + "/api/todo/";
URL["todo_del"] = (id) => "http://127.0.0.1:" + URL_PORT + "/api/todo/" + id;

URL["project_add"] = "http://127.0.0.1:" + URL_PORT + "/api/project/";
URL["project_del"] = (id) => "http://127.0.0.1:" + URL_PORT + "/api/project/" + id;

URL["home"] = "/";

// All
URL["persone_all"] = "/persone_all";
URL["todo_all"] = "/todo_all";
URL["project_all"] = "/project_all";

// By id
URL["persone_id"] = "/persone/:persone_pk";
URL["todo_id"] = "/todo/:todo_pk";
URL["project_id"] = "/project/:project_pk";

// Forms
URL["login"] = "/login";
URL["project_form"] = "/project_form/:project_pk";
URL["todo_form"] = "/todo_form/:todo_pk";

// Relative
// persone_id <-> project_all
URL["persone_project_all"] = "/persone/:persone_pk/project_all";
// persone <-> todo_all
URL["persone_todo_all"] = "/persone/:persone_pk/project_all";
// persone_id <-> project_id
URL["persone_project_id"] = "/persone/:persone_pk/project/:project_pk";
// persone_id <-> todo_id
URL["persone_todo_id"] = "/persone/:persone_pk/todo/:todo_pk";

URL["me"] = "http://127.0.0.1:" + URL_PORT + "/getMe/";

URL["project_filter_by_name"] = (name) =>
  "http://127.0.0.1:" + URL_PORT + "/api/project/?name=" + name;

export default URL;
