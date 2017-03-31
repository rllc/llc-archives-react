import React from 'react'
import NavLink from '../common/NavLink';
import Badge from 'react-mdl/lib/Badge'
import AdminVerifyService from '../../services/AdminVerifyService.js'

class CongregationLink extends React.Component {

  publishedSermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID && sermon.published === true
    )).length
  }

  unpublishedSermonCount(congregation) {
    return this.props.sermons.filter((sermon) => (
      sermon.bucketID === congregation.bucketID && sermon.published === false
    )).length
  }

  render() {
    const linkText = this.props.congregation.displayName + " (" + this.publishedSermonCount(this.props.congregation) + ")";
    const unpublishedSermonCount = this.unpublishedSermonCount(this.props.congregation);
    var link = linkText;

    if (AdminVerifyService.isUserAdmin(this.props.admin, this.props.congregation.bucketID, this.props.user)
          && unpublishedSermonCount) {
        link = <Badge text={unpublishedSermonCount}>{linkText}</Badge>
    }

    return (
      <NavLink
        className='mdl-navigation__link'
        to={"/congregations/" + this.props.congregation.bucketID}
        key={this.props.congregation.key} >
          {link}
        </NavLink>
    )
  }
}

export default CongregationLink
