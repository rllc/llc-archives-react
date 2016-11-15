import React from 'react';

import Rebase from 're-base';
var base = Rebase.createClass({
  apiKey: "AIzaSyD-uM9lWp5_MTYBauHlsbzJUhUkNE53zh4",
  databaseURL: "https://llc-archives.firebaseio.com",
  authDomain: "llc-archives.firebaseapp.com",
  storageBucket: "llc-archives.appspot.com"
});

class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sermons: [],
      loading: true,
      sermonBase: ''
    }
  }

  componentWillMount() {
    console.log('MainPanel componentWillMount');
    var searchBase = '';

    //some logic to decide if we want to display sermons for all congregations or just a specific one
    searchBase = 'sermons';
    console.log('Searching in ', searchBase);

    this.ref = base.fetch(searchBase, {
      context: this,
      state: 'sermons',
      asArray: true,
      queries: {
        limitToFirst: 20
      },
      then(data){
          this.setState({ sermons: data});
          this.setState({ loading: false })
          console.log("Sermon fetch Complete:", data);
          console.log(this.state.sermons);
      }
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  render() {
    //console.log(this.props.sermons);
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          { item.fileUrl }
          { item.key }
        </li>
      );
    }

    if (this.state.loading == true) {
      console.log('Still loading sermons...');
      return <ul>Loading...</ul>;
    }
    else {
      return <ul>{ this.state.sermons.map(createItem) }</ul>;
    }
  }
}

export default MainPanel
