const URL = {};

URL["backend"] = "http://127.0.0.1:8000/api/";

URL["home"] = "/";

// All
URL["persone_all"] = "/persone_all";
//URL["todo_all"] = "/todo_all";
//URL["project_all"] = "/project_all"

// By id
URL["persone_id"] = "/persone/:persone_pk";
URL["todo_id"] = "/todo/:todo_pk";
URL["project_id"] = "/project/:project_pk";

// Relative
// persone_id <-> project_all
URL["persone_project_all"] = "/persone/:persone_pk/project_all";
// persone <-> todo_all
URL["persone_todo_all"] = "/persone/:persone_pk/project_all";
// persone_id <-> project_id
URL["persone_project_id"] = "/persone/:persone_pk/project/:project_pk";
// persone_id <-> todo_id
URL["persone_todo_id"] = "/persone/:persone_pk/todo/:todo_pk";

export default URL;
