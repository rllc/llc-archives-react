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
    this.loginCheck();

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

  componentDidMount(){

  }

  componentWillUnMount() {
    base.removeBinding(this.congregationsRef);
    base.removeBinding(this.sermonsRef);
  }

  loginCheck() {
    const self = this;
    var authHandler = function(user) {
      if(user) {
//        console.log('You are logged in right now!');
        self.setState({ userID : user.uid,
                      displayName : user.displayName,
                      email : user.email})
        console.log(user);
      }
      else {
//        console.log('Nobody logged in!');
        self.setState({userID : null})
      }
    }

    if (! this.userID) {
      base.onAuth(authHandler);
    }
  }

  render() {
    var self = this;
    var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          base:base,
          congregations:self.state.congregations,
          sermons:self.state.sermons,
          userID:self.state.userID,
          email:self.state.email,
          displayName:self.state.displayName
        })
      })

      return (
        <div>{children}</div>
      )
  }
}

export default App;
