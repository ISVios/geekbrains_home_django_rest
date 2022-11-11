import React from "react";
import TodoList from "./Todo";

const ProjectItem = ({ project, todoSet }) => {
  const todoForProject = todoSet.filter((elm) => {
    return elm.project === project.pk;
  });
  const haveRepo = project.repoUrl !== "";
  const projectHead = haveRepo ? (
    <a href={project.repoUrl}> {project.name} </a>
  ) : (
    project.name
  );

  return (
    <>
      <li>
        <h2>{projectHead}</h2>
      </li>
      <TodoList todoSet={todoForProject} />
    </>
  );
};

const ProjectList = ({ projectSet, todoSet }) => {
  return (
    <ul>
      {projectSet.map((project) => {
        return <ProjectItem project={project} todoSet={todoSet} />;
      })}
    </ul>
  );
};

export default ProjectList;
