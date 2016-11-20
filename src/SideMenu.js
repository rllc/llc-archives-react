import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  componentWillUnMount() {
    this.props.base.removeBinding(this.ref);
  }

  render() {
    const sideMenuOpen = this.props.sideMenuOpen;

    var createItem = function(item, index) {
      return (
        <MenuItem key={item.bucketID}>{item.displayName}</MenuItem>
      );
    };

    return (
      <Drawer open={sideMenuOpen}>
        { this.props.congregations.map(createItem) }
      </Drawer>
    )
  }
}

export default SideMenu
