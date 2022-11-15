import React from 'react';
import './App.css';

import axios from 'axios';

import Menu   from "./components/Menu.js"
import Footer from "./components/Footer.js"

import PersoneList from "./components/Persone.js"
import ProjectList from './components/Project';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			"personeSet" : [],
			"projectSet" : [],
			"todoSet": []
    };
  }

  componentDidMount() {
		const url = "http://127.0.0.1:8000/api/";
		const objs = ["persone", "project", "todo"];

		objs.forEach((obj) => {
				axios.get(url + obj).then(response => {
						const req = {}
						req[obj + "Set"] = response.data;
						this.setState(req)
				});
		} );
		
  }

  render() {
    return (
      <div>
      <Menu />
      <hr />
			<PersoneList personeSet={this.state.personeSet} />
      <hr />
			<ProjectList 
						projectSet={this.state.projectSet} 
						todoSet={this.state.todoSet} /> 
      <hr />
      <Footer />
      </div>
    );
  }
}

export default App;
