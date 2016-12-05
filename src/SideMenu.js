import React from 'react';
import {Drawer, Navigation} from 'react-mdl/lib/Layout';

class SideMenu extends React.Component {

  render() {
    return (
      <Drawer title="Congregations">
        <Navigation>
          { this.props.congregations.map((congregation) => (
            <a key={congregation.key} onClick={() => { this.props.selectCongregation(congregation) }} href="#">
              {congregation.displayName}
            </a>
          ))}
        </Navigation>
      </Drawer>
    )
  }
}

export default SideMenu
