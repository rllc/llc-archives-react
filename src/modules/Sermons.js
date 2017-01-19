import React from 'react'
import {Layout, Drawer, Navigation, Header, HeaderRow, Content} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';
import NavLink from './NavLink';

class Sermons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  publishedSermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID && sermon.published === true
    )).length
  }

  unpublishedSermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID && sermon.published === false
    )).length
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
        <Navigation>

        <NavLink
          to={"/sermons/all"}
          key={'sermons'}
          activeClassName="active" >
            All ({self.props.sermons.length})
          </NavLink>
        { this.props.congregations.map((congregation) => (

          <NavLink
            to={"/sermons/" + congregation.bucketID}
            key={congregation.key}
            activeClassName="active" >
              {congregation.displayName + " (" + self.publishedSermonCount(congregation) + ")"}
            </NavLink>
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
