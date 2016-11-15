import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import MainPanel from './MainPanel.js';
import TopBar from './TopBar.js';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <TopBar />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React!!!</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <SideMenu />
          <MainPanel />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
