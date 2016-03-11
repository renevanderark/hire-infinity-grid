import React from "react";
import dragging from "./dragging";
import { DragSource } from "react-dnd";
import { GRID_ITEM } from "./types";

export default (DragComponent) => {
	const DraggingComponent = dragging(DragComponent);

	const componentSource = {
		beginDrag: (props) => {
			return {
				props: props
			};
		}
	};

	function collect(connect, monitor) {
		return {
			dragSource: connect.dragSource(),
			dragPreview: connect.dragPreview(),
			isDragging: monitor.isDragging()
		};
	}

	class Draggable extends React.Component {
		render() {
			return (this.props.isDragging ?
							this.props.dragPreview(<div key="drag" ><DraggingComponent {...this.props} /></div>) :
							this.props.dragSource(<div><DragComponent {...this.props} /></div>));
		}
	}

	Draggable.propTypes = {
		dragPreview: React.PropTypes.func.isRequired,
		dragSource: React.PropTypes.func.isRequired,
		isDragging: React.PropTypes.bool.isRequired
	};

	return DragSource(GRID_ITEM, componentSource, collect)(Draggable);
};