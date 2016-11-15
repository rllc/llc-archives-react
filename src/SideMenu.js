import React from 'react';
import ReactDOM from 'react-dom';

import Rebase from 're-base';
var base = Rebase.createClass({
  apiKey: "AIzaSyD-uM9lWp5_MTYBauHlsbzJUhUkNE53zh4",
  databaseURL: "https://llc-archives.firebaseio.com",
  authDomain: "llc-archives.firebaseapp.com",
  storageBucket: "llc-archives.appspot.com"
});

class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      congregations: [],
      loading: true
    }
  }

  componentWillMount() {
    console.log('SideMenu componentWillMount');
    this.ref = base.fetch('congregations', {
      context: this,
      state: 'congregations',
      asArray: true,
      then(data){
          this.setState({ congregations: data});
          this.setState({ loading: false })
          console.log("Fetch Complete:", data);
          console.log(this.state.congregations);
      }
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  render() {
    var createItem = function(item, index) {
      console.log('inside createItem');
      return (
        <li key={ index }>
          { item.displayName }
        </li>
      );
    };

    //console.log('about to render sidebar');
    //console.log(this.state);
    if (this.state.loading == true) {
      console.log('Still loading congregations...');
      return <ul>Loading...</ul>;
    }
    else {
      return <ul>{ this.state.congregations.map(createItem) }</ul>;
    }
  }
}

export default SideMenu
