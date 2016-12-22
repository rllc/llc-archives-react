import React from 'react';
import {Drawer, Navigation} from 'react-mdl/lib/Layout';
import Badge from 'react-mdl/lib/Badge';

class SideMenu extends React.Component {

  sermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID
    )).length
  }

  render() {
    const self = this;
    return (
      <Drawer title="Congregations">
        <Navigation>
          <a key='recent' onClick={() => { self.props.selectCongregation(null) }} href="#">
              <Badge text={self.props.sermons.length}>All</Badge>
          </a>
          { self.props.congregations.map((congregation) => (
            <a key={congregation.key} onClick={() => { self.props.selectCongregation(congregation) }} href="#">
                <Badge text={ self.sermonCount(congregation) }>{congregation.displayName}</Badge>
            </a>
          ))}
        </Navigation>
      </Drawer>
    )
  }
}

export default SideMenu
