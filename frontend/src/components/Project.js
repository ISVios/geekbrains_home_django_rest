import React from "react";
import { Link, useParams } from "react-router-dom";

import TodoList from "./Todo";

const ProjectDetail = ({ projectSet, todoSet }) => {
  const { project_pk } = useParams();
  const project_l = projectSet.filter((item)=>item.pk === Number(project_pk));
  return (
    <>
      {project_l.map((item) => {
        return (
          <ProjectDetailWithTodos
            key={project_pk}
            project={item}
            todoSet={todoSet}
          />
        );
      })}
    </>
  );
};

const ProjectDetailWithTodos = ({ project, todoSet }) => {
  let repo_elem = "";
  const filtred_todo = todoSet.filter((elem) => {
    return elem.project === project.pk;
  });
  if (project.repoUrl) {
    repo_elem = (
      <h2>
        <a href={project.repoUrl}> Github link</a>
      </h2>
    );
  }
  return (
    <>
      <h1>ProjectName: {project.name}</h1>
      {repo_elem}
      <hr />
      <h2>
        Todo: <button>Add</button>
      </h2>
      <TodoList todoSet={filtred_todo} />
    </>
  );
};

const ProjectItem = ({ project }) => {
  const { persone_pk } = useParams();
  return (
    <>
      <h2>
        <Link to={"/persone/" + persone_pk + "/project/" + project.pk}>
          {project.name}
        </Link>
      </h2>
    </>
  );
};

const ProjectList = ({ projectSet, todoSet }) => {
  const { persone_pk } = useParams();
  const filtered = projectSet.filter((item) => {
    return item.persones.includes(Number(persone_pk));
  });
  return (
    <>
      {filtered.map((project) => {
        return (
          <ProjectItem key={project.pk} project={project} todoSet={todoSet} />
        );
      })}
    </>
  );
};

export { ProjectList, ProjectDetail };
