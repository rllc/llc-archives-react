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
      sermons: [],
      selectedCongregation: null,
      searchTerm: "",
      sermonsLoading: true,
      congregationsLoading: true
    }
    this.selectCongregation = this.selectCongregation.bind(this);
    this.searchForValue = this.searchForValue.bind(this);
  }

  componentWillMount() {
    this.congregationsRef = base.fetch('congregations', {
      context: this,
      state: 'congregations',
      asArray: true,
      then(data){
        this.setState({
          congregations: data,
          congregationsLoading: false
        });
      }
    });
    this.sermonsRef = base.fetch('sermons', {
      context: this,
      state: 'sermons',
      asArray: true,
      queries: {
        orderByChild: 'date'
      },
      then(data){
          this.setState({
            sermons: data,
            sermonsLoading:false
          });
      }
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.congregationsRef);
    base.removeBinding(this.sermonsRef);
  }

  selectCongregation(selection) {
    var selectedCongregation;
    if (selection) {
      selectedCongregation = this.state.congregations.find(function(congregation) {
        return congregation.bucketID === selection.bucketID;
      });
    }
    this.setState({selectedCongregation : selectedCongregation});
    this.setState({searchTerm : ""})
  }

  searchForValue(term) {
    this.setState({searchTerm : term})
  }

  render() {
    return (
	    <Layout fixedHeader fixedDrawer>
          <TopBar
            selectedCongregation={this.state.selectedCongregation}
            searchForValue={this.searchForValue}/>
          <SideMenu
            base={base}
            selectedCongregation={this.state.selectedCongregation}
            selectCongregation={this.selectCongregation}
            congregations={this.state.congregations}
            sermons={this.state.sermons} />
          <Content>
            <MainPanel
              base={base}
              sermons={this.state.sermons}
              selectedCongregation={this.state.selectedCongregation}
              searchTerm={this.state.searchTerm}/>
          </Content>
      </Layout>
    );
  }
}

export default App;
