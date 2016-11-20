import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import MainPanel from './MainPanel.js';
import TopBar from './TopBar.js';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Rebase from 're-base';
import './App.css';

var base = Rebase.createClass({
  apiKey: "AIzaSyD-uM9lWp5_MTYBauHlsbzJUhUkNE53zh4",
  databaseURL: "https://llc-archives.firebaseio.com",
  authDomain: "llc-archives.firebaseapp.com",
  storageBucket: "llc-archives.appspot.com"
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      congregations: [],
      selectedCongregation: 0,
      loading: true,
      sideMenuOpen: true
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.selectCongregation = this.selectCongregation.bind(this);
  }

  componentWillMount() {
    this.ref = base.fetch('congregations', {
      context: this,
      state: 'congregations',
      asArray: true,
      then(data){
        this.setState({
          congregations: data,
          loading: false
        });
      }
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  handleToggle(value) {
    this.setState({sideMenuOpen: !this.state.sideMenuOpen});
  }

  selectCongregation(index) {
    this.setState({selectedCongregation : index});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <TopBar
            sideMenuOpen={this.state.sideMenuOpen}
            onChange={this.handleToggle.bind(this)} />
          <SideMenu
            base={base}
            sideMenuOpen={this.state.sideMenuOpen}
            onChange={this.selectCongregation.bind(this)}
            congregations={this.state.congregations} />
          <MainPanel
            base={base}
            sideMenuOpen={this.state.sideMenuOpen}
            selectedCongregation={this.state.congregations[this.state.selectedCongregation]} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
