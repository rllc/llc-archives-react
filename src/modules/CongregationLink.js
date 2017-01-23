import React from 'react'
import NavLink from './NavLink';
import Badge from 'react-mdl/lib/Badge'

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

  isUserAdmin(congregation) {
    // TODO: lookup user roles in firebase
    const authorizedCongregations = ['rockford-archives', 'minneapolis-archives', 'phoenix-archives']
    if (authorizedCongregations.includes(congregation.bucketID)) {
      return true;
    }
    return false;
  }

  render() {
    const linkText = this.props.congregation.displayName + " (" + this.publishedSermonCount(this.props.congregation) + ")";
    const unpublishedSermonCount = this.unpublishedSermonCount(this.props.congregation);
    var link = linkText;
    if (this.isUserAdmin(this.props.congregation) && unpublishedSermonCount) {
        link = <Badge text={unpublishedSermonCount}>{linkText}</Badge>
    }

    return (
      <NavLink
        className='mdl-navigation__link'
        to={"/sermons/" + this.props.congregation.bucketID}
        key={this.props.congregation.key}
        activeClassName="active" >
          {link}
        </NavLink>
    )
  }
}

export default CongregationLink
