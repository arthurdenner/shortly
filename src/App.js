import React, { Component } from 'react';
import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>All links</h2>
          <LinkList />
        </div>
        <div>
          <h2>Create a short link</h2>
          <CreateLink />
        </div>
      </div>
    );
  }
}

export default App;
