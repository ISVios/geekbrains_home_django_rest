import React from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import AuthorList from "./components/Author.js"

import Footer from "./components/Footer.js"

import Menu from "./components/Menu.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "authors" : []
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/author").then( response => {
      const authors = response.data
      this.setState(
        {
          "authors" : authors
        }
      )
    }
    ).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
      <Menu />
      <hr />
      <AuthorList authors={this.state.authors} />
      <hr />
      <Footer />
      </div>
    )
  }
}

export default App;
