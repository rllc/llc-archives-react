import React from 'react';
import {List} from 'react-mdl/lib/List'
import Sermon from './Sermon.js'
import SermonService from './SermonService.js'

class MainPanel extends React.Component {

  render() {
    var sermons = SermonService.filter(
      this.props.sermons,
      this.props.searchTerm,
      this.props.selectedCongregation)

      return (
        <List>
          {
            sermons.map((sermon) => (
              <Sermon key={sermon.key} sermon={sermon} />
            ))
          }
        </List>
      )
  }
}

export default MainPanel
