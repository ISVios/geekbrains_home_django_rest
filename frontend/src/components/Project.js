import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";

import TodoList from "./Todo";

const ProjectDetail = ({ projectSet, todoSet }) => {
  const { project_pk } = useParams();
  const project_l = projectSet.filter((item) => item.pk === Number(project_pk));
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

const CurrentUserProjectItem = ({ project, deleteProjectClb }) => {
  const { persone_pk } = useParams();
  return (
    <>
      <h2>
        <Link to={"/persone/" + persone_pk + "/project/" + project.pk}>
          {project.name}
        </Link>
        <button>Edit</button>{" "}
        <button
          onClick={() => {
            deleteProjectClb(project);
          }}
        >
          Del
        </button>
      </h2>
    </>
  );
};

const CurrentUserProjectList = ({
  projectSet,
  todoSet,
  addProjectForm,
  deleteProjectClb,
}) => {
  const { persone_pk } = useParams();
  const filtered = projectSet.filter((item) => {
    return item.persones.includes(Number(persone_pk));
  });
  return (
    <>
      {filtered.map((project) => {
        return (
          <CurrentUserProjectItem
            deleteProjectClb={deleteProjectClb}
            key={project.pk}
            project={project}
            todoSet={todoSet}
          />
        );
      })}
      {addProjectForm}
    </>
  );
};

const ProjectItem = ({ project }) => {
  return (
    <>
      <h2>
        <Link>{project.name}</Link>
      </h2>
    </>
  );
};

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_by_name: "",
    };
  }


	handlerSubmit(event) {
		
	}

  render() {
    const { filterProjectByName } = this.props;
    const { projectSet } = this.props;

    return (
      <>
        <form onSubmit={(event) => this.handlerSubmit(event)}>
          <input
            value={this.state.filter_by_name}
            name="filter_by_name"
            type="text"
            onChange={(event) =>
              this.setState({ filter_by_name: event.target.value })
            }
          />
          <button type="submit">find</button>
        </form>
        {projectSet &&
          projectSet.map((project) => {
            return <ProjectItem key={project.pk} project={project} />;
          })}
      </>
    );
  }
}

export { ProjectList, ProjectDetail, CurrentUserProjectList };
