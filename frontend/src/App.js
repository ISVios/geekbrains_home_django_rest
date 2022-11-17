import React from 'react';
import './App.css';

import axios from 'axios';
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter, Routes} from 'react-router-dom'

import Menu   from "./components/Menu.js"
import Footer from "./components/Footer.js"

import URL from './URL';
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
				req[obj + "Set"] = response.data["results"];
				this.setState(req)
			});
		});
	}

  render() {
		return (<div className='App'>
			<BrowserRouter>
				<Routes>

					(// home)
					<Route path={URL.home} element={<>
						<p>Menu with parm</p>
						<hr />
						SOME LOGIN FORM
						<hr />
					</>} />

						(// persone_all DELETE IN NEXT LESSON)
					<Route path={URL.persone_all} element={<>
						<p>Menu with parm</p>
						<hr />
						Persone list
						<hr />
					</>} />

						(// persone_id)
					<Route path={URL.persone_id} element={<>
						<p>Menu with parm</p>
						<hr />
						Persone info
						<hr />
					</>} />

						(// persone_project_all)
					<Route path={URL.persone_id} element={<>
						<p>Menu with parm</p>
						<hr />
						Persone all ProjectList
						<hr />
					</>} />

						(// persone_project_id)
					<Route path={URL.persone_id} element={<>
						<p>Menu with parm</p>
						<hr />
						Persone Project with TodoList
						<hr />
					</>} />

(// persone_todo_id NEED just for command put update) 

					(// 404 MUST BE LAST)
					<Route path="*" element={<>
						<hr />
						WRONG WAY
						<hr />
					</>} />

				</Routes>
				<Footer />
			</BrowserRouter>
			</div>
		);
  }
}

export default App;
