import React from 'react';
import {Drawer, Navigation} from 'react-mdl/lib/Layout';
import Badge from 'react-mdl/lib/Badge';

class SideMenu extends React.Component {

  sermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID
    )).length
  }

  componentDidUpdate(prevProps, prevState){
    var layout = document.querySelector('.mdl-layout');
    var drawer = document.querySelector('.mdl-layout__drawer');
    if (layout.classList.contains('is-small-screen') && drawer.classList.contains('is-visible')) {
      layout.MaterialLayout.toggleDrawer();
    }
  }

  render() {
    const self = this;
    return (
      <Drawer title="Congregations">
        <Navigation>
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
