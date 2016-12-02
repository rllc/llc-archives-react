import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import MainPanel from './MainPanel.js';
import TopBar from './TopBar.js';
import Rebase from 're-base';
import './App.css';

import {Content, Layout} from 'react-mdl/lib/Layout';

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
      selectedCongregation: null,
      loading: true,
    }
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

  selectCongregation(selection) {
    var selectedCongregation = this.state.congregations.find(function(congregation) {
      return congregation.bucketID === selection.bucketID;
    });
    this.setState({selectedCongregation : selectedCongregation});
  }

  render() {
    return (
	    <Layout fixedHeader fixedDrawer>
          <TopBar
            selectedCongregation={this.state.selectedCongregation}/>
          <SideMenu
            base={base}
            selectCongregation={this.selectCongregation}
            congregations={this.state.congregations} />
          <Content>
            <MainPanel
              base={base}
              selectedCongregation={this.state.selectedCongregation} />
          </Content>
      </Layout>
    );
  }
}

export default App;
