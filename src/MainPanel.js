import React from 'react';
import {List, ListItem, ListItemContent} from 'react-mdl/lib/List'

class MainPanel extends React.Component {

  render() {
    if (this.props.searchTerm) {
      return (
        <List>
            <p>Searching for {this.props.searchTerm}</p>
        {
          this.props.sermons.filter((sermon) => (
            ( (sermon.published === true) && (
                (sermon.comments.search(this.props.searchTerm) !== -1) ||
                (sermon.minister.search(this.props.searchTerm) !== -1) ||
                (sermon.bibleText.search(this.props.searchTerm) !== -1)
              )
            )
          )).reverse().map((sermon) => (
              <ListItem key={sermon.key} twoLine style={{textAlign: 'center'}}>
                <ListItemContent subtitle={sermon.comments}>
                  {sermon.minister} : {new Date(sermon.date).toLocaleDateString()} : {sermon.bibleText}
                </ListItemContent>
              </ListItem>
          ))
        }
        </List>
      )
    }

    if (this.props.selectedCongregation === null) {  //Default case, no search term and no selected congregation
      var date = new Date().setDate(new Date().getDate() - 30); //this goes back 30 days at the moment
      var oldDate = new Date(date);
      var oldDateString = oldDate.getFullYear() + '-'
                + ('0' + (oldDate.getMonth() + 1)).slice(-2) + '-'
                + ('0' + oldDate.getDate()).slice(-2) + '-'
                + "T00:00:00";
      return (
        <List>
        {
          this.props.sermons.filter((sermon) => (
            ((sermon.published === true) && (sermon.date > oldDateString))
          )).reverse().map((sermon) => (
              <ListItem key={sermon.key} twoLine style={{textAlign: 'center'}}>
                <ListItemContent subtitle={sermon.comments}>
                  {sermon.minister} : {new Date(sermon.date).toLocaleDateString()} : {sermon.bibleText}
                </ListItemContent>
              </ListItem>
          ))
        }
        </List>
      )
    }

    else {  //No search term, there is a congregation selected.
      return  (
        <List>
        {
          this.props.sermons.filter((sermon) => (
            ((sermon.published === true) && (sermon.bucketID === this.props.selectedCongregation.bucketID))
          )).reverse().map((sermon) => (
              <ListItem key={sermon.key} twoLine style={{textAlign: 'center'}}>
                <ListItemContent subtitle={sermon.comments}>
                  {sermon.minister} : {new Date(sermon.date).toLocaleDateString()} : {sermon.bibleText}
                </ListItemContent>
              </ListItem>
          ))
        }
        </List>
      )
    }
  }
}

export default MainPanel
