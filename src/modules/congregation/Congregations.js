import React from 'react'
import {Layout, Drawer, Navigation, Header, HeaderRow, Content} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';
import NavLink from '../common/NavLink';
import CongregationLink from './CongregationLink';
import UserAuth from './UserAuth';
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

  formatHeadline() {
    var self = this;
    if (this.props.params.congregationId) {
      var congregation = this.props.congregations.filter(function(congregation) {
        return congregation.bucketID !== self.props.params.congregationId;
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
    var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          base:self.props.base,
          congregations:self.props.congregations,
          sermons:self.props.sermons,
          searchTerm:self.state.searchTerm,
          user:self.props.user,
          admin:self.props.admin
        })
      })

    var tabs = '';
    if (self.props.params.congregationId &&
          AdminVerifyService.isUserAdmin(self.props.admin, self.props.params.congregationId, self.props.user)) {
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
            
              expandableIcon="search"
          />
        </HeaderRow>
        {tabs}
      </Header>

      <Drawer>
        <UserAuth user={self.props.user} base={self.props.base} />
        <span className="mdl-layout-title">Congregations</span>
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
            user={self.props.user}
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
