import React from 'react'
import {Layout, Drawer, Navigation, Header, HeaderRow, Content} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';
import NavLink from '../common/NavLink';
import CongregationLink from './CongregationLink';
import Button from 'react-mdl/lib/Button';
import AdminVerifyService from '../../services/AdminVerifyService.js'

class Congregations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  authHandler(error) {
    if (error) {
      console.error(error);
    }
    return;
  }

  login = () => {
    this.props.base.authWithOAuthRedirect('google', this.authHandler);
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

  componentDidUpdate(prevProps, prevState){
    var layout = document.querySelector('.mdl-layout');
    var drawer = document.querySelector('.mdl-layout__drawer');
    if (layout.classList.contains('is-small-screen') && drawer.classList.contains('is-visible')) {
      layout.MaterialLayout.toggleDrawer();
    }
  }

  render() {
    var self = this;

    let button = null;
    if (self.state && self.props.displayName) {
      button = <Button raised accent>{self.props.displayName}</Button>;
    }
    else {
      button = <Button raised accent onClick={this.login}>Login</Button>;
    }

    var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          base:self.props.base,
          congregations:self.props.congregations,
          sermons:self.props.sermons,
          searchTerm:self.state.searchTerm,
          userID:self.props.userID,
          admin:self.props.admin
        })
      })

    var tabs = '';
    if (self.props.params.congregationId &&
          AdminVerifyService.isUserAdmin(self.props.admin, self.props.params.congregationId, self.props.userID)) {
      var publishedLink = '/congregations/' + self.props.params.congregationId + '/published';
      var unpublishedLink = '/congregations/' + self.props.params.congregationId + '/unpublished';
      tabs =
            <HeaderRow><Navigation>
                <NavLink to={publishedLink}>Published
                      </NavLink>
                <NavLink to={unpublishedLink}>Not Published
                      </NavLink>
              </Navigation></HeaderRow>
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
        {tabs}
      </Header>

      <Drawer title="Congregations">
        {button}
        <Navigation>

        <NavLink
          to={"/congregations/all"}
          key={'congregations'}>
            All ({self.props.sermons.length})
          </NavLink>
        { this.props.congregations.map((congregation) => (
          <CongregationLink
            key={congregation.key}
            sermons={self.props.sermons}
            admin={self.props.admin}
            userID={self.props.userID}
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

export default Congregations
