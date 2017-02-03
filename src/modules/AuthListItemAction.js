
import React from 'react'
import NavLink from './NavLink.js'
import Icon from 'react-mdl/lib/Icon'
import {ListItemAction} from 'react-mdl/lib/List'

class AuthListItemAction extends React.Component {

  isUserAdmin(sermon) {
    // TODO: lookup user roles in firebase
    const authorizedCongregations = ['rockford-archives', 'minneapolis-archives', 'phoenix-archives']
    if (authorizedCongregations.includes(sermon.bucketID)) {
      return true;
    }
    return false;
  }

  render() {
    var self = this;
    if (this.isUserAdmin(this.props.sermon)) {
      return (
        <ListItemAction>
          <NavLink
            to={"/sermons/" + self.props.sermon.key + '/edit/'} >
            <Icon name="edit" />
            </NavLink>
        </ListItemAction>
      )
    }
    else {
      return <span/>
    }
  }
}

export default AuthListItemAction
