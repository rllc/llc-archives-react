import React, { Component } from 'react';
import Rebase from 're-base';

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
      sermons: []
    }
  }

  componentWillMount() {
    this.congregationsRef = base.fetch('congregations', {
      context: this,
      state: 'congregations',
      asArray: true,
      then(data){
        this.setState({
          congregations: data
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
            sermons: data
          });
      }
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.congregationsRef);
    base.removeBinding(this.sermonsRef);
  }

  render() {
    var self = this;
    var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          base:base,
          congregations:self.state.congregations,
          sermons:self.state.sermons
        })
      })

      return (
        <div>{children}</div>
      )
  }
}

export default App;
