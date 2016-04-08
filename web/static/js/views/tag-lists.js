import React from 'react'
import TagList from './tag-list';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

class TagLists extends React.Component {

  buildTagLists() {
    if (this.props.posts.length > 0) {
      return this.props.posts.map((post) => {
        return Object.keys(post.tags);
      }).reduce(function(a, b) {
        return a.concat(b);
      }).unique();
    } else {
      return [];
    }
  }

  renderTagLists() {
    const lists = this.buildTagLists();
    return lists.map((tag) => {
      return (
        <TagList
        key={tag}
        tag={tag}
        posts={this.props.posts}
        />
      )
    })
  }

  renderDefaultTagList() {
    const tags = ["Backlog", "In-Progress", "Needs-Review", "Needs-Author-Reply", "Ready-To-Merge", "Done"];
    return tags.map((tag) => {
      return (
        <TagList
        key={tag}
        tag={tag}
        posts={this.props.posts}
        />
      )
    })
  }

  render() {
    return (
      <div>
				{this.renderDefaultTagList()}
			</div>
    )
  }
}

module.exports = DragDropContext(HTML5Backend)(TagLists);
