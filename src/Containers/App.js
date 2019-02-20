import React, { Component } from 'react';
import './App.css';
import SearchComponent from './Search';
import ListComponent from './List'
import { Switch, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>

            <Route path='/list' component={ListComponent} />
            <Route path='/' component={SearchComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
