import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class TopBar extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render(){
    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    if (this.props.sideMenuOpen) {
      contentStyle.marginLeft = '256px';
    }

    return (
      <div style={contentStyle}>
      <AppBar
        title={this.props.selectedCongregation ? this.props.selectedCongregation.displayName : 'Recent Sermons'}
        onLeftIconButtonTouchTap={this.handleChange}
        iconElementRight={<TextField hintText="Search"/>} />

        </div>
    );
  }
}

export default TopBar
