

import React from 'react'
class UserAuthDropdown extends React.Component {

  login = (provider) => {
    this.props.base.authWithOAuthRedirect(provider, this.authHandler);
  }

  logout() {
    this.props.base.unauth();
  }

  determineSignoutIcon() {
    if (this.props.user && this.props.user.provider) {
      if (this.props.user.provider.includes('google')) {
        return 'images/google-icon.png';
      }
      else if (this.props.user.provider.includes('facebook')) {
        return 'images/facebook-icon.png';
      }
    }
  }

  render() {
    var self = this;
      if (self.props.user) {
        return (
          <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor={self.props.htmlFor}>
            <li className="mdl-menu__item" onClick={this.logout.bind(this)}>
              <img alt="social login" src={self.determineSignoutIcon()} className="social-login-icon" />
              <span className="social-login-text">
                Sign out
              </span>
            </li>
          </ul>
        )
      }
      else {
        return (
          <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor={self.props.htmlFor}>
            <li className="mdl-menu__item" onClick={this.login.bind(this, 'google')}>
              <img alt="google social login" src="images/google-icon.png" className="social-login-icon" />
              <span className="social-login-text">
                Sign in with Google
              </span>
            </li>
            <li className="mdl-menu__item" onClick={this.login.bind(this, 'facebook')}>
              <img alt="facebook social login" src="images/facebook-icon.png" className="social-login-icon" />
              <span className="social-login-text">
                Sign in with Facebook
              </span>
            </li>
          </ul>
        )
      }
  }
}

export default UserAuthDropdown
