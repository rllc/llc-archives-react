import React from 'react'
import {List, ListItem, ListItemContent} from 'react-mdl/lib/List'
import AuthListItemAction from './AuthListItemAction.js'
import SermonService from '../../services/SermonService.js'
import DateFormattingService from '../../services/DateFormattingService.js'
var ReactGA = require('react-ga');

class Congregation extends React.Component {

  playSermon(sermon) {
    ReactGA.outboundLink({
      label: sermon.fileUrl
    }, function () {
      window.location.href = sermon.fileUrl;
    });
  }

  formatTitle(sermon) {
    if (sermon.minister || sermon.date) {
      return sermon.minister  + ' : ' + DateFormattingService.formatDate(sermon.date);
    }
    return sermon.fileUrl;
  }

  formatSubtitle(sermon) {
    return sermon.bibleText + ' ' + sermon.comments;
  }

  render() {
    var self = this;
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
                subtitle={self.formatSubtitle(sermon)}>
                {self.formatTitle(sermon)}
              </ListItemContent>
              <AuthListItemAction sermon={sermon}
                admin={this.props.admin}
                user={this.props.user}/>
            </ListItem>
          ))
        }
      </List>
    )
  }
}

export default Congregation
