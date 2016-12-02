import React from 'react';
import {Drawer} from 'react-mdl/lib/Layout';
import {List, ListItem, ListItemContent} from 'react-mdl/lib/List'

class SideMenu extends React.Component {

  render() {
    return (
      <Drawer title="Congregations">
        <List>
          { this.props.congregations.map((congregation) => (
            <ListItem key={congregation.key} onClick={() => { this.props.selectCongregation(congregation) }}>
              <ListItemContent avatar="person">{congregation.displayName}</ListItemContent>
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }
}

export default SideMenu
