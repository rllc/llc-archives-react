import React from 'react'
import {List, ListItem, ListItemContent} from 'react-mdl/lib/List'
import AuthListItemAction from './AuthListItemAction.js'
import SermonService from '../../services/SermonService.js'
import DateFormattingService from '../../services/DateFormattingService.js'

class Congregation extends React.Component {

  playSermon(sermon) {
    window.location.href = sermon.fileUrl;
  }

  render() {
    var sermons = [];
    if (this.props.params.tabId === 'unpublished') {
      sermons = SermonService.getUnpublishedSermons(
        this.props.sermons,
        this.props.params.congregationId
      );
    }
    else {
      sermons = SermonService.filter(
        this.props.sermons,
        this.props.searchTerm,
        this.props.params.congregationId);
    }

    return (
      <List>
        {
          sermons.map((sermon) => (
            <ListItem key={sermon.key} twoLine>
              <ListItemContent
                onClick={this.playSermon.bind(this, sermon)}
                subtitle={sermon.bibleText + ' ' + sermon.comments}>
                {sermon.minister} : {DateFormattingService.formatDate(sermon.date)}
              </ListItemContent>
              <AuthListItemAction sermon={sermon}
                admin={this.props.admin}
                userID={this.props.userID}/>
            </ListItem>
          ))
        }
      </List>
    )
  }
}

export default Congregation
