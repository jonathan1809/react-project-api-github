import React, { Component } from 'react';
import './App.css';
import SearchComponent from './Search';
import ListComponent from './List'
import { Switch, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switch>

            <Route path='/list' component={ListComponent} />
            <Route path='/' component={SearchComponent} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
