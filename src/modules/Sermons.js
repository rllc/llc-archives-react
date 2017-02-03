import React from 'react'
import {Layout, Drawer, Navigation, Header, HeaderRow, Content} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';
import NavLink from './NavLink';
import CongregationLink from './CongregationLink';
import Button from 'react-mdl/lib/Button';

class Sermons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.handleChange = this.handleChange.bind(this);
  }

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
        self.setState({userID : user.uid,
                      displayName : user.displayName})
        console.log(user);
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

  componentDidMount(){
    this.loginCheck();
  }

  formatHeadline() {
    var self = this;
    if (this.props.params.congregationId) {
      var congregation = this.props.congregations.find(function(congregation) {
        return congregation.bucketID === self.props.params.congregationId;
      });
      if (congregation) {
        return congregation.displayName;
      }
    }
    return 'Recent Sermons'
  }

  handleChange(event){
    this.setState({searchTerm: event.target.value});
  }

  render() {
    var self = this;

    var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          base:self.props.base,
          congregations:self.props.congregations,
          sermons:self.props.sermons,
          searchTerm:self.state.searchTerm
        })
      })

    let button = null;
    if (self.state && self.state.userID) {
      button = <Button raised accent>{self.state.displayName}</Button>;
    }
    else {
      button = <Button raised accent onClick={this.login}>Login</Button>;
    }

    return (
      <Layout fixedHeader fixedDrawer>
      <Header style={{color: 'white'}}>
        <HeaderRow title={self.formatHeadline()}>
          <Textfield
              value={self.state.searchTerm}
              onChange={self.handleChange}
              label="Search"
              expandable
              expandableIcon="search"
          />
        </HeaderRow>
      </Header>

      <Drawer title="Congregations">
        {button}
        <Navigation>

        <NavLink
          to={"/sermons/all"}
          key={'sermons'}>
            All ({self.props.sermons.length})
          </NavLink>
        { this.props.congregations.map((congregation) => (
          <CongregationLink
            key={congregation.key}
            sermons={self.props.sermons}
            congregation={congregation} />
        ))}

        </Navigation>
      </Drawer>

    <Content>
      {children}
    </Content>

    </Layout>
    )
  }
}

export default Sermons
