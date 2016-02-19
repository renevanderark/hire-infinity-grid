import React from "react";
import {DragSource} from "react-dnd";

const innerCircle = <circle r="5" />;

const circleSource = {
	beginDrag: () => {
		return {innerComponent: innerCircle};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class Circle extends React.Component {
	getComponent() {
		return "FOOBAR";
	}

	render() {

		return this.props.connectDragSource(
			<div style={{width: "10px", height: "10px"}}><svg height="10" width="10"><g transform="translate(5 5)">{innerCircle}</g></svg></div>
		);
	}
}

Circle.propTypes = {
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired
};

export default DragSource("CIRCLE", circleSource, collect)(Circle);