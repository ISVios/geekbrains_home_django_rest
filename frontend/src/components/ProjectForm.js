import React from "react";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <hr />
        <hr />
      </form>
    );
  }
}

export default ProjectForm;
