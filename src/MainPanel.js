import React from 'react';
import {List, ListItem, ListItemContent} from 'react-mdl/lib/List'

class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sermons: [],
      loading: true
    }
  }

  componentWillUnMount() {
    this.props.base.removeBinding(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedCongregation &&
      (this.props.selectedCongregation.bucketID !== nextProps.selectedCongregation.bucketID)) {
        this.setState({
          loading:true
        });
      this.ref = this.props.base.fetch('sermons', {
        context: this,
        state: 'sermons',
        asArray: true,
        queries: {
          limitToLast: 20,
          orderByChild: 'bucketID',
          equalTo: nextProps.selectedCongregation.bucketID
        },
        then(data){
            this.setState({
              sermons: data,
              loading:false
            });
        }
      });
    }
  }

  render() {
    if (this.state.loading === true) {
      return <h1>Loading...</h1>;
    }
    else {
      return  (
        <List>
        {
          this.state.sermons.map((sermon) => (
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
