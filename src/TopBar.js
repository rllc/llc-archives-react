import React from 'react';
import {Header, HeaderRow} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    this.props.searchForValue(event.target.value);
  }



  render(){
    return (
      <Header style={{color: 'white'}}>
        <HeaderRow title={this.props.selectedCongregation ? this.props.selectedCongregation.displayName : 'Recent Sermons'}>
          <Textfield
              value={this.state.value}
              onChange={this.handleChange}
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
