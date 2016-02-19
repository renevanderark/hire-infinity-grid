import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from "react-dnd";

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
		props.onAddComponent(monitor.getItem().innerComponent, monitor.getClientOffset());
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
	}

	componentDidMount() {
		window.addEventListener("resize", this.resizeListener);
		window.addEventListener("mousemove", this.mousemoveListener);
		window.addEventListener("mouseup", this.mouseupListener);
		this.onResize();
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
		this.mouseState = MOUSE_DOWN;
	}

	onMouseMove(ev) {
		switch(this.mouseState) {
			case MOUSE_DOWN:
				this.movement.x = this.mousePos.x - ev.clientX;
				this.movement.y = this.mousePos.y - ev.clientY;
				this.mousePos.x = ev.clientX;
				this.mousePos.y = ev.clientY;
				this.props.onDrag(this.movement);
				return ev.preventDefault();
			default:
		}
	}

	onMouseUp() {
		this.mouseState = MOUSE_UP;
	}



	onResize() {
		let node = ReactDOM.findDOMNode(this).parentNode;
		this.props.onResize(node.getBoundingClientRect());
	}

	render() {
		let [x, y, w, h] = this.props.grid.viewBox;
		return this.props.connectDropTarget(
			<svg onMouseDown={this.onMouseDown.bind(this)}
				style={{width: (this.props.grid.viewBox[2] + 2 )+ "px", height: (this.props.grid.viewBox[3] + 2) + "px"}}
				viewBox={this.props.grid.viewBox.join(" ")}>

				{range(this.props.grid.gridSize - (x % this.props.grid.gridSize) + x - this.props.grid.gridSize, w + this.props.grid.gridSize, this.props.grid.gridSize).map((val) =>
					<line key={`x-${val}`} stroke="rgb(196,196,196)" x1={val} x2={val} y1={y} y2={y + h} />
				)}
				{range(this.props.grid.gridSize - (y % this.props.grid.gridSize) + y - this.props.grid.gridSize, h + this.props.grid.gridSize, this.props.grid.gridSize).map((val) =>
					<line key={`y-${val}`} stroke="rgb(196,196,196)" x1={x} x2={x + w} y1={val} y2={val} />
				)}
				{this.props.grid.components.map((component, i) => (
					<g key={i} transform={`translate(${component.x} ${component.y})`}>
						{component.component}
					</g>
				))}
			</svg>
		);
	}
}

InfinityGrid.propTypes = {
	connectDropTarget: React.PropTypes.func,
	grid: React.PropTypes.object,
	onDrag: React.PropTypes.func,
	onResize: React.PropTypes.func
};

export default DropTarget("CIRCLE", target, collect)(InfinityGrid);