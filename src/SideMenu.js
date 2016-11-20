import React from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this.selectCongregation = this.selectCongregation.bind(this);
  }

  selectCongregation(event, menuItem, index) {
    this.props.onChange(index);
  }

  render() {
    const sideMenuOpen = this.props.sideMenuOpen;
    const self = this;
    var createItem = function(item, index) {
      return (
        <MenuItem
          key={item.bucketID}> {item.displayName}</MenuItem>
      );
    };

    return (
      <Drawer open={sideMenuOpen}>
        <Menu
          onItemTouchTap={self.selectCongregation} >
          { this.props.congregations.map(createItem) }
        </Menu>
      </Drawer>
    )
  }
}

export default SideMenu
