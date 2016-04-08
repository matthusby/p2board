import React from 'react'
import Post from './post'
import { DropTarget } from 'react-dnd';
import { update_post } from '../actions/site';

const tagListTarget = {
	drop(props, monitor) {
		const item = monitor.getItem();
		updateCard(item, props.tag);
	}
}

@DropTarget('TYPE_POST', tagListTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))

class TagList extends React.Component {
  get_posts() {
    return this.props.posts.filter((post) => {
      const tags = Object.keys(post.tags).map(function(k){return k.toLowerCase()});
      if (tags.indexOf(this.props.tag.toLowerCase()) != -1) {
        return true;
      }
    });
  }

  renderPosts() {
    const posts = this.get_posts();
    return posts.map((post) => {
      return ( <Post key={post.ID} post={post} /> )
    })
  }

  render() {
    return this.props.connectDropTarget(
      <div className="tag-list">
				<div className="title">{this.props.tag}</div>
				{this.renderPosts()}
			</div>
    )
  }
}

export default TagList;

function updateCard(card, newTag){
	card.post.tags[newTag] = {};
}
