import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sermons: [],
      loading: true,
      sermonBase: ''
    }
  }

  componentWillMount() {
    this.ref = this.props.base.fetch('sermons', {
      context: this,
      state: 'sermons',
      asArray: true,
      queries: {
        limitToLast: 20,
        orderByChild: 'bucketID',
        equalTo: 'glendale-archives'
      },
      then(data){
          this.setState({ sermons: data});
          this.setState({ loading: false })
      }
    });
  }

  componentWillUnMount() {
    this.props.base.removeBinding(this.ref);
  }

  render() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <ListItem primaryText={ item.key } key={item.key} rightIcon={<ActionInfo />} />
      );
    }

    if (this.state.loading === true) {
      console.log('Still loading sermons...');
      return <ul>Loading...</ul>;
    }
    else {
      return <List>{ this.state.sermons.map(createItem) }</List>;
    }
  }
}

export default MainPanel
