
import React from 'react'
import NavLink from '../common/NavLink.js'
import Icon from 'react-mdl/lib/Icon'
import {ListItemAction} from 'react-mdl/lib/List'
import AdminVerifyService from '../../services/AdminVerifyService.js'

class AuthListItemAction extends React.Component {

  render() {
    var self = this;
    if (AdminVerifyService.isUserAdmin(self.props.admin, self.props.sermon.bucketID, self.props.userID)) {
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
