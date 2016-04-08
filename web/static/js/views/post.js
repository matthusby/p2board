import React from 'react'
import {DragSource} from 'react-dnd'

const postSource = {
	beginDrag: function(props){
		return {
			post: props.post
		}
	}
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Post extends React.Component {
  render() {
		const isDragging = this.props.isDragging;
		const connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className="post" style={{ opacity: isDragging ? 0.5 : 1 }}>
				<a target="_blank" href={this.props.post.URL}>{this.props.post.title}</a>
			</div>
    )
  }
}

//export default Post;
module.exports = DragSource('TYPE_POST', postSource, collect)(Post);
