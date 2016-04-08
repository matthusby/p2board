import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {

  render() {
    return (
      <div>
				This is the header
			</div>
    )
  }
}

export default connect(
  state => ({
    posts: state.app.posts
  }), {}
)(Header)
