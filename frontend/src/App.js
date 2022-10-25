import React from 'react';
import logo from './logo.svg';
import './App.css';

import AuthorList from "./components/Author.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "authors" : []
    }
  }

  componentDidMount() {
    const authors = [
      {
        "first_name": "First name 1",
        "last_name": "Last name 1",
        "birthday": "2022"
      },
      {
        "first_name": "First name 2",
        "last_name": "Last name 2",
        "birthday": "1993"
      },
      {
        "first_name": "First name 3",
        "last_name": "Last name 3",
        "birthday": "1989"
      }
    ]

    this.setState(
      {
        "authors": authors
      }
    )
  }

  render() {
    return (
      <div>
      <AuthorList authors={this.state.authors} />
      </div>
    )
  }
}

export default App;
