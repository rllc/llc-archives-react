import React from 'react'
import {List, ListItem, ListItemContent, ListItemAction} from 'react-mdl/lib/List'
import Icon from 'react-mdl/lib/Icon'
import SermonService from '../services/SermonService.js'
import DateFormattingService from '../services/DateFormattingService.js'

class CongregationSermons extends React.Component {

  render() {
    var sermons = SermonService.filter(
      this.props.sermons,
      this.props.searchTerm,
      this.props.params.congregationId)

    return (
      <List>
        {
          sermons.map((sermon) => (
            <ListItem key={sermon.key} threeLine>
              <ListItemContent subtitle={sermon.bibleText + ' ' + sermon.comments}>{sermon.minister} : {DateFormattingService.formatDate(sermon.date)}</ListItemContent>
              <ListItemAction>
                <a href={sermon.fileUrl}><Icon name="play_circle_filled" /></a>
              </ListItemAction>
            </ListItem>
          ))
        }
      </List>
    )
  }
}

export default CongregationSermons
