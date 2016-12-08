import React from 'react';
import {ListItem, ListItemContent, ListItemAction} from 'react-mdl/lib/List'
import Icon from 'react-mdl/lib/Icon'

class Sermon extends React.Component {

  render() {
    return (
        <ListItem key={this.props.sermon.key} threeLine>
          <ListItemContent avatar="person" subtitle={this.props.sermon.bibleText + ' ' + this.props.sermon.comments}>{this.props.sermon.minister} : {new Date(this.props.sermon.date).toLocaleDateString()}</ListItemContent>
          <ListItemAction>
            <a href="#"><Icon name="play_circle_filled" /></a>
          </ListItemAction>
        </ListItem>
      )
  }
}

export default Sermon
