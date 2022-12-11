import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "1",
      persone: props.me.pk,
      text: "",
      close: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.addClb(
      Number(this.state.project),
      this.state.persone,
      this.state.text,
      !this.state.close
    );
    event.preventDefault();
  }

  render() {
    const { projectSet } = this.props;
    const commandButtonText = "Add";
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <hr />
        <h2>Todo Form</h2>
        <label htmlFor={"project"}>Project: </label>
        <select
          name="project"
          onChange={(event) => this.handleChange(event)}
          id="project"
          value={this.state.project}
        >
          {projectSet.map((project) => {
            return (
              <option value={project.pk} key={project.pk}>
                {project.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <textarea
          name="text"
          row="16"
          onChange={(event) => this.handleChange(event)}
          placeholder="Todo text..."
          value={this.state.text}
        ></textarea>
        <br />
        <br />
        <label htmlFor="todo_close">Completed</label>
        <input
          name="close"
          id="todo_close"
          type={"checkbox"}
          value={this.state.close}
          onClick={(event) => {
            this.setState({ close: event.target.checked });
          }}
        />
        <br />
        <br />
        <button>{commandButtonText}</button>
        <button type="reset">Clear</button>
        <hr />
      </form>
    );
  }
}

export default TodoForm;
