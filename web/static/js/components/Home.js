import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'
import { add_post } from '../actions/site';
import TagLists from '../views/tag-lists';

class Home extends React.Component {

  componentDidMount() {
    console.log('trying to fetch');
    this.getAllPosts(41201405, {
      number: 20
    }, []);
  }

  checkLocalstorage() {
		//return false; //disable for now, need to figure out caching
    for (var i in window.localStorage) {
      const post = JSON.parse(localStorage.getItem(i));
      this.props.add_post(post);
    }
    return (window.localStorage.length);
  }

  getAllPosts(id, next_page, acc) {
    if (this.checkLocalstorage()) {
      return;
    }
    const main = this;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const wpcom = require('wpcom')(token);
    const site = wpcom.site(id);

    site.postsList(next_page, function(err, list) {
      console.log('checking the api');
      list.posts.map(function(post) {
        setTimeout(function() {
          main.props.add_post(post)
        }, 1)
      });
			return; // we don't need all posts
      if (list.meta.next_page) {
        setTimeout(function() {
          main.getAllPosts(id, {
            page_handle: list.meta.next_page,
            number: 100
          }, acc.concat(list.posts));
        }, 1);
      } else {
        console.log(err);
        return acc.concat(list.posts);
      }
    });
  }

  render() {
    return (
      <div>
				<TagLists posts={this.props.posts} />
			</div>
    )
  }
}

export default connect(
  state => ({
    posts: state.app.posts
  }),
  {
    add_post
  }
)(Home)
