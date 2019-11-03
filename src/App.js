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

    //filter for last 3 years
    var currentTime = new Date();
    var year = currentTime.getFullYear() - 1;
    var month = currentTime.getMonth();
    var day = currentTime.getDate();

    var dateString = new Date(year, month, day).toISOString();

    this.congregationsRef = base.bindToState('congregations', {
      context: this,
      state: 'congregations',
      asArray: true
    });

    this.sermonsRef = base.bindToState('sermons', {
      context: this,
      state: 'sermons',
      asArray: true,
      queries: {
        orderByChild: 'date',
        startAt: dateString
      }
    });

    this.adminRef = base.bindToState('administrators', {
      context: this,
      state: 'admin',
      asArray: true
    });
  }

  componentDidMount(){

  }

  componentWillUnMount() {
    base.removeBinding(this.congregationsRef);
    base.removeBinding(this.sermonsRef);
    base.removeBinding(this.adminRef);
  }

  loginCheck() {
    const self = this;
    var authHandler = function(user) {
      if(user) {
        self.setState({
          user : {
            id : user.uid,
            displayName : user.displayName,
            email : user.email,
            photoURL : user.photoURL,
            provider : user.providerData[0].providerId
          }
        })
      }
      else {
        self.setState({user : null})
      }
    }

    if (! this.user) {
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
          admin:self.state.admin,
          user: self.state.user
        })
      })

      return (
        <div>{children}</div>
      )
  }
}

export default App;
