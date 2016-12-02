import React from 'react';
import {Header, HeaderRow} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';

class TopBar extends React.Component {

  render(){
    return (
      <Header style={{color: 'white'}}>
        <HeaderRow title={this.props.selectedCongregation ? this.props.selectedCongregation.displayName : 'Recent Sermons'}>
          <Textfield
              value=""
              onChange={() => {}}
              label="Search"
              expandable
              expandableIcon="search"
          />
        </HeaderRow>
      </Header>
    );
  }
}

export default TopBar
