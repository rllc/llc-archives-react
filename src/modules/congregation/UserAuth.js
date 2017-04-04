
import React from 'react'
import {Header, HeaderRow} from 'react-mdl/lib/Layout';
import UserAuthDropdown from './UserAuthDropdown'

class UserAuth extends React.Component {

  render() {
    var self = this;
    return (

        <div className="auth-drawer-header" >
            <img alt="user avatar" src={self.props.user ? self.props.user.photoURL : "images/anon.png"} className="auth-avatar"/>
            <div className="auth-avatar-dropdown">
              <span>{self.props.user ? self.props.user.displayName : "Signed out"}</span>
              <div className="mdl-layout-spacer"></div>
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_drop_down</i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <UserAuthDropdown htmlFor="accbtn" base={self.props.base} user={self.props.user} />
            </div>
        </div>
      
    )
  }
}

export default UserAuth
