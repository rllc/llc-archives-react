import React from 'react'
import SermonService from '../../services/SermonService.js'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import ProgressBar from 'react-mdl/lib/ProgressBar'
import Switch from 'react-mdl/lib/Switch'
import {List, ListItem, ListItemContent, ListItemAction} from 'react-mdl/lib/List'
import {Layout, Header, Content} from 'react-mdl/lib/Layout';

class SermonEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sermon: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sermon: SermonService.findById(nextProps.sermons, nextProps.params.sermonId)
    });
  }

  onBlur(fieldName, event) {
    var sermon = this.state.sermon;
    if (event.target.type === 'checkbox') {
      sermon[fieldName] = event.target.checked;
    }
    else {
      sermon[fieldName] = event.target.value;
    }
    this.setState({
      sermon: sermon
    });
  }

  persistSermon() {
    let self = this;
    self.props.base.update('sermons/' + self.state.sermon.key, {
      data: self.state.sermon
    }).then(() => {
      // this.props.history.push('/congregations/' + this.state.sermon.bucketID);
    }).catch(err => {
      console.error(err);
    }).then(() => {
      self.goBack();
    });
  }

  goBack() {
    this.props.router.push('/congregations/' + this.state.sermon.bucketID);
  }

  render() {
    let self = this;

    if (self.state.sermon) {
      var fileName = self.state.sermon.fileUrl.split(self.state.sermon.bucketID + '/')[1];

      return (
        <Layout fixedHeader>
            <Header title={self.state.sermon.bucketID} >
            </Header>
            <Content>
                <List>
                  <ListItem key='bucketID'>
                    <ListItemContent>
                      Bucket ID : {self.state.sermon.bucketID}
                    </ListItemContent>
                  </ListItem>
                  <ListItem key={self.state.sermon.fileUrl}>
                    <ListItemContent>
                      File Path : {fileName}
                    </ListItemContent>
                  </ListItem>
                      <ListItem key='bibleText'>
                        <ListItemContent>
                          <Textfield
                              onBlur={this.onBlur.bind(this, 'bibleText')}
                              label="Bible Text"
                              floatingLabel
                              defaultValue={self.state.sermon.bibleText} />
                        </ListItemContent>
                      </ListItem>
                      <ListItem key='comments'>
                        <ListItemContent>
                          <Textfield
                              onBlur={this.onBlur.bind(this, 'comments')}
                              label="Event"
                              floatingLabel
                              defaultValue={self.state.sermon.comments}
                          />
                        </ListItemContent>
                      </ListItem>
                      <ListItem key='date'>
                        <ListItemContent>
                          <Textfield
                              onBlur={this.onBlur.bind(this, 'date')}
                              label="Date"
                              floatingLabel
                              defaultValue={self.state.sermon.date}
                          />
                        </ListItemContent>
                      </ListItem>
                      <ListItem key='minister'>
                        <ListItemContent>
                          <Textfield
                              onBlur={this.onBlur.bind(this, 'minister')}
                              label="Minister"
                              floatingLabel
                              defaultValue={self.state.sermon.minister} />
                        </ListItemContent>
                      </ListItem>
                      <ListItem key='published'>
                        <ListItemContent>
                        <Switch ripple
                          defaultChecked={self.state.sermon.published}
                          onBlur={this.onBlur.bind(this, 'published')}>Published</Switch>
                        </ListItemContent>
                      </ListItem>
                      <ListItem key="submit_button">
                        <ListItemContent>
                          <Button raised accent ripple onClick={this.goBack.bind(this)}>Go Back</Button>
                        </ListItemContent>
                        <ListItemAction>
                          <Button raised colored ripple onClick={this.persistSermon.bind(this)}>Submit</Button>
                        </ListItemAction>
                      </ListItem>
                </List>
            </Content>
        </Layout>
      )
    }
    else {
      const divStyle = {
        width: '100%'
      };
      return (
        <ProgressBar indeterminate style={divStyle}/>
      )
    }
  }
}

export default SermonEdit
