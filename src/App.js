import React, { Component } from "react";
import Rebase from "re-base";
import LoadingIndicator from "./modules/common/LoadingIndicator";
import moment from "moment";

var base = Rebase.createClass({
  apiKey: "AIzaSyD-uM9lWp5_MTYBauHlsbzJUhUkNE53zh4",
  databaseURL: "https://llc-archives.firebaseio.com",
  authDomain: "llc-archives.firebaseapp.com",
  storageBucket: "llc-archives.appspot.com"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      congregations: [],
      sermons: [],
      loading: true
    };

    this.congregationsRef = base.bindToState("congregations", {
      context: this,
      state: "congregations",
      asArray: true
    });

    this.adminRef = base.bindToState("administrators", {
      context: this,
      state: "admin",
      asArray: true
    });

    //initially load last 3 months of sermons
    var endDateString = moment().format();
    var startDateString = moment().subtract(3, 'months').format();

    this.sermonsRef = base.bindToState("sermons", {
      context: this,
      state: "sermons",
      asArray: true,
      queries: {
        orderByChild: "date",
        startAt: startDateString,
        endAt: endDateString
      },
      then: () => {
        this.setState({ loading: false });
      }
    });

  }

  componentWillMount() {
    this.loginCheck();
  }

  componentDidMount() {
    //get the rest of the data
    var endDateString = moment().format();
    var startDateString = moment().subtract(3, 'years').format();

    this.sermonsRef = base.bindToState("sermons", {
      context: this,
      state: "sermons",
      asArray: true,
      queries: {
        orderByChild: "date",
        startAt: startDateString,
        endAt: endDateString
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.congregationsRef);
    base.removeBinding(this.sermonsRef);
    base.removeBinding(this.adminRef);
  }

  loginCheck() {
    const self = this;
    var authHandler = function(user) {
      if (user) {
        self.setState({
          user: {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            provider: user.providerData[0].providerId
          }
        });
      } else {
        self.setState({ user: null });
      }
    };

    if (!this.user) {
      base.onAuth(authHandler);
    }
  }

  render() {
    var self = this;
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        base: base,
        congregations: self.state.congregations,
        sermons: self.state.sermons,
        admin: self.state.admin,
        user: self.state.user
      });
    });
    if (this.state.loading) {
      return (
          <LoadingIndicator visible={this.state.loading} />
      );
    } else {
      return <div>{children}</div>;
    }
  }
}

export default App;
