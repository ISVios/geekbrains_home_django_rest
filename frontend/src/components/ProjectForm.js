import React from "react";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      repoUrl: "",
      persones: ["" + props.me.pk],
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { addClb } = this.props;
    addClb(this.state.name, this.state.persones);
    event.preventDefault();
  }

  render() {
    const personeWithoutMe = this.props.personeSet.filter(
      (persone) => persone.pk !== this.props.me.pk
    );

    return (
      <>
        <hr />
        <h2>Create project</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            name="name"
            onChange={(event) => this.handleChange(event)}
            type="text"
            placeholder="project name"
          />
          <input
            name="repoUrl"
            onChange={(event) => this.handleChange(event)}
            type="url"
            placeholder="repo url"
          />
          <select
            name="persones"
            onChange={(event) => {
              const options = event.target.options;
              const select = [];
              let curOpt;
              for (let i = 0; i < options.length; i++) {
                curOpt = options[i];
                if (curOpt.selected) {
                  select.push(curOpt.value);
                }
              }
              this.setState({ persones: [...select, "" + this.props.me.pk] });
            }}
            multiple
          >
            {personeWithoutMe.map((persone) => {
              return (
                <option key={persone.pk} value={persone.pk}>
                  {persone.firstName}
                </option>
              );
            })}
          </select>
          <button>add</button>
        </form>
      </>
    );
  }
}

export default ProjectForm;
