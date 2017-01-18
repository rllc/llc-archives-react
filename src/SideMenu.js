import React from 'react';
import {Drawer, Navigation} from 'react-mdl/lib/Layout';
import Badge from 'react-mdl/lib/Badge';
import Button from 'react-mdl/lib/Button';


class SideMenu extends React.Component {

  login = () => {
    var authHandler = function(error, user) {
      if(error){
         console.log(error);
       }
       else{
         console.log('authentication success!!!');
         console.log(user);
       }
      return;
    }

    this.props.base.authWithOAuthRedirect('google', authHandler);
  }

  loginCheck() {
    const self = this;
    var authHandler = function(user) {
      if(user) {
        console.log('You are logged in right now!');
        self.setState({userID : user.uid})
      }
      else {
        console.log('Nobody logged in!');
        self.setState({userID : null})
      }
    }

    if (! this.userID) {
      this.props.base.onAuth(authHandler);
    }
  }

  sermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID
    )).length
  }

  componentDidUpdate(prevProps, prevState){
    var layout = document.querySelector('.mdl-layout');
    var drawer = document.querySelector('.mdl-layout__drawer');
    if (layout.classList.contains('is-small-screen') && drawer.classList.contains('is-visible')) {
      layout.MaterialLayout.toggleDrawer();
    }
  }

  componentDidMount(){
    this.loginCheck();
  }

  isSelected(congregation) {
    return (
      congregation != null &&
      this.props.selectedCongregation != null &&
      (this.props.selectedCongregation.bucketID === congregation.bucketID)
    )
  }

  render() {
    const self = this;
    const selectedStyle = {
        backgroundColor: '#e0e0e0'
    }

    let button = null;
    if (self.state && self.state.userID) {
      button = <Button raised accent>You are authenticated!</Button>;
    }
    else {
      button = <Button raised accent onClick={this.login}>Login</Button>;
    }

    return (
      <Drawer title="Congregations">
        {button}
        <Navigation>
          <a key='recent' onClick={() => { self.props.selectCongregation(null) }} href="#">
              <Badge text={self.props.sermons.length}>All</Badge>
          </a>
          { self.props.congregations.map((congregation) => (
            <a key={congregation.key}
              style={(this.isSelected(congregation)) ? selectedStyle : {}}
              onClick={() => { self.props.selectCongregation(congregation) }} href="#">
                <Badge text={ self.sermonCount(congregation) }>{congregation.displayName}</Badge>
            </a>
          ))}
        </Navigation>
      </Drawer>
    )
  }
}

export default SideMenu
