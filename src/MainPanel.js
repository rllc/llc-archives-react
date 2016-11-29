import React from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Download</MenuItem>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sermons: [],
      loading: true
    }
  }

  componentWillMount() {

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

    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    if (this.props.sideMenuOpen) {
      contentStyle.marginLeft = '256px';
    }

    if (this.state.loading === true) {
      console.log('Still loading sermons...');
      return <ul>Loading...</ul>;
    }
    else {
      return  (
        <div style={contentStyle}>


        <List>
          {this.state.sermons.map((sermon) => (
            <ListItem
              key={sermon.key}
              rightIconButton={rightIconMenu}
              primaryText={
                <p>
                  {sermon.minister} : {new Date(sermon.date).toLocaleDateString()} : {sermon.bibleText}
                </p>
              }
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>{sermon.comments}</span><br />
                </p>
              }
              secondaryTextLines={1}
            />
          ))
        }
        </List>
        </div>
      )
    }
  }
}

export default MainPanel
