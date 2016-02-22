import React from "react";
import {DragSource} from "react-dnd";
import { GRID_ENTITY } from "./types";

export default (DragComponent, DropComponent) => {
	const componentSource = {
		beginDrag: () => {
			return {innerComponent: <DropComponent />};
		}
	};

	function collect(connect, monitor) {
		return {
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging()
		};
	}

	class Draggable extends React.Component {
		render() {
			return this.props.connectDragSource(
				<div>
					<DragComponent />
				</div>
			);
		}
	}

	Draggable.propTypes = {
		connectDragSource: React.PropTypes.func.isRequired,
		isDragging: React.PropTypes.bool.isRequired
	};

	return DragSource(GRID_ENTITY, componentSource, collect)(Draggable);
};