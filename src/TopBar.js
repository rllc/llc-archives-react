import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class TopBar extends React.Component {
  render(){
    return (
      <AppBar title="LLC Archived Sermons"
      iconElementRight={<TextField hintText="Search"/>} />
    );
  }
}

export default TopBar
