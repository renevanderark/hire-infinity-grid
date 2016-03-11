import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from "react-dnd";
import itemTypes from "./types";

const COMPONENT_DOWN = 2;
const MOUSE_DOWN = 1;
const MOUSE_UP = 0;

const range = (begin, amount, interval = 1) => {
	let ar = [];
	for (let i = begin; i < begin + amount; i += interval) {
		ar.push(i);
	}
	return ar;
};

const target = {
	drop(props, monitor) {
		const {x, y} = monitor.getClientOffset();
		if(monitor.getItem().props.onDrop) {
			monitor.getItem().props.onDrop({
				x: props.viewBox[0] + x - props.domPos.x,
				y: props.viewBox[1] + y - props.domPos.y,
				props: monitor.getItem().props
			});
		}
	}
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

class InfinityGrid extends React.Component {

	constructor(props) {
		super(props);
		this.resizeListener = this.onResize.bind(this);
		this.mousemoveListener = this.onMouseMove.bind(this);
		this.mouseupListener = this.onMouseUp.bind(this);
		this.mousePos = this.movement = {};
		this.mouseState = MOUSE_UP;
		this.state = {
			resizeCaught: false,
			draggingComponent: -1
		};
	}

	componentDidMount() {
		window.addEventListener("resize", this.resizeListener);
		window.addEventListener("mousemove", this.mousemoveListener);
		window.addEventListener("mouseup", this.mouseupListener);
		this.commitResize();
	}

	componentDidUpdate() {
		if(this.state.resizeCaught) { this.commitResize(); }
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeListener);
		window.removeEventListener("mousemove", this.mousemoveListener);
		window.removeEventListener("mouseup", this.mouseupListener);
	}

	onMouseDown(ev) {
		this.mousePos.x = ev.clientX;
		this.mousePos.y = ev.clientY;
		this.movement = {x: 0, y: 0};
		this.mouseState = this.mouseState === COMPONENT_DOWN ? COMPONENT_DOWN : MOUSE_DOWN;
		return ev.preventDefault();
	}

	onTouchStart(ev) {
		this.onMouseDown({clientX: ev.touches[0].pageX, clientY: ev.touches[0].pageY});
		return ev.preventDefault();
	}

	onTouchMove(ev) {
		this.onMouseMove({clientX: ev.touches[0].pageX, clientY: ev.touches[0].pageY});
	}


	onMouseMove(ev) {
		this.movement.x = this.mousePos.x - ev.clientX;
		this.movement.y = this.mousePos.y - ev.clientY;
		this.mousePos.x = ev.clientX;
		this.mousePos.y = ev.clientY;

		switch(this.mouseState) {
			case MOUSE_DOWN:
				return this.props.actions.onDrag(this.movement);
			case COMPONENT_DOWN:
				if(this.state.draggingComponent === -1) {
					this.setState({draggingComponent: this.componentIndex});
				}
				return this.props.children[this.componentIndex].props.onDrag(this.movement);
			default:
		}
	}

	onMouseUp() {
		this.mouseState = MOUSE_UP;
		this.setState({draggingComponent: -1});

	}

	commitResize() {
		const me = ReactDOM.findDOMNode(this);
		if(!me) { this.setState({resizeCaught: false}); return; }
		const node = me.parentNode;

		this.props.actions.onResize(node.getBoundingClientRect());
		this.setState({resizeCaught: false});
	}

	onResize() {
		this.setState({resizeCaught: true});
	}


	startComponentDrag(idx, ev) {
		if((ev.target.getAttribute("class") || "").split(" ").indexOf("handle") > -1) {
			this.mouseState = COMPONENT_DOWN;
			this.componentIndex = idx;
		}
	}

	render() {
		const [x, y, w, h] = this.props.viewBox;

		const gridLines = this.props.gridSize ? [
			range(this.props.gridSize - (x % this.props.gridSize) + x - this.props.gridSize, w + this.props.gridSize, this.props.gridSize).map((val, i) =>
				(<line key={`x-${i}`} stroke="rgb(196,196,196)" x1={val} x2={val} y1={y} y2={y + h} />)),
			range(this.props.gridSize - (y % this.props.gridSize) + y - this.props.gridSize, h + this.props.gridSize, this.props.gridSize).map((val, i) =>
				(<line key={`y-${i}`} stroke="rgb(196,196,196)" x1={x} x2={x + w} y1={val} y2={val} />))
			] : [null, null];

		return this.props.connectDropTarget(
			<svg id="grid-svg"
				onDragStart={(ev) => ev.preventDefault()}
				onMouseDown={this.onMouseDown.bind(this)}
				onTouchEnd={this.onMouseUp.bind(this)}
				onTouchMove={this.onTouchMove.bind(this)}
				onTouchStart={this.onTouchStart.bind(this)}

				style={{
					width: (this.props.viewBox[2] + 2 )+ "px",
					height: (this.props.viewBox[3] + 2) + "px"
				}}
				viewBox={this.props.viewBox.join(" ")}>
				{gridLines[0]}
				{gridLines[1]}

				{React.Children.map(this.props.children, (childComponent, i) => (
					<g key={i} onMouseDown={this.startComponentDrag.bind(this, i)} onTouchStart={this.startComponentDrag.bind(this, i)}>
						{childComponent}
					</g>
				))}
			</svg>
		);
	}
}

InfinityGrid.propTypes = {
	actions: React.PropTypes.object,
	children: React.PropTypes.node,
	components: React.PropTypes.array,
	connectDropTarget: React.PropTypes.func,
	gridSize: React.PropTypes.number,
	viewBox: React.PropTypes.array
};

export default DropTarget(itemTypes, target, collect)(InfinityGrid);
