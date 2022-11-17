const URL = {};

URL["home"] = "/";

// All
URL["persone_all"] = "/persone_all";
//URL["todo_all"] = "/todo_all";
//URL["project_all"] = "/project_all"

// By id
URL["persone_id"] = "/persone/:int";
URL["todo_id"] = "/todo/:int";
URL["project_id"] = "/project/:int";


// Relative
// persone_id <-> project_all
URL["persone_project_all"] = "/persone/:int/project_all";
// persone <-> todo_all
URL["persone_todo_all"] = "/persone/:int/project_all";
// persone_id <-> project_id
URL["persone_project_id"] = "/persone/:int/project/:int";
// persone_id <-> todo_id
URL["persone_todo_id"] = "/persone/:int/todo/:int";

export default URL;
