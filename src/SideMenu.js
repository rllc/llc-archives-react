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

  isSelected(congregation) {
    return (
      congregation != null &&
      this.props.selectedCongregation != null &&  
      (this.props.selectedCongregation.bucketID === congregation.bucketID)
    )
  }

  render() {
    const self = this;
    const selectedStyle = {
        backgroundColor: '#e0e0e0'
    }

    return (
      <Drawer title="Congregations">
        <Navigation>
          <a key='recent' onClick={() => { self.props.selectCongregation(null) }} href="#">
              <Badge text={self.props.sermons.length}>All</Badge>
          </a>
          { self.props.congregations.map((congregation) => (
            <a key={congregation.key}
              style={(this.isSelected(congregation)) ? selectedStyle : {}}
              onClick={() => { self.props.selectCongregation(congregation) }} href="#">
                <Badge text={ self.sermonCount(congregation) }>{congregation.displayName}</Badge>
            </a>
          ))}
        </Navigation>
      </Drawer>
    )
  }
}

export default SideMenu
