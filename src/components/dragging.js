import React from "react";
import { DragLayer } from "react-dnd";

export default (DragComponent) => {
	const layerStyles = {
		position: "fixed",
		pointerEvents: "none",
		zIndex: 1000,
		left: 0,
		top: 0,
		width: "100%",
		height: "100%"
	};

	const getItemStyles = (props) => {
		const { currentOffset } = props;
		if(!currentOffset) { return {display: "none"}; }
		const { x, y } = currentOffset;
		const transform = `translate(${x}px, ${y}px)`;
		return {
			opacity: props.isDragging ? "0.5" : "1",
			transform: transform,
			WebkitTransform: transform
		};
	};

	function collect(monitor) {
		return {
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging()
		};
	}

	class Dragging extends React.Component {
		render() {
			const { isDragging } = this.props;
			if(!isDragging) { return null; }
			return (
				<div style={layerStyles}>
					<div style={getItemStyles(this.props)}>
						<DragComponent {...this.props} />
					</div>
				</div>
			);
		}
	}

	Dragging.propTypes = {
		currentOffset: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}),
		isDragging: React.PropTypes.bool
	};

	return DragLayer(collect)(Dragging);
};