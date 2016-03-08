Infinity Grid
===

```javascript
import React from "react";
import ReactDOM from "react-dom";

import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, draggable } from "hire-infinity-grid";
import clone from "clone-deep";


const Circle = draggable(
	() => (<svg height="40" width="40"><g transform="translate(20 20)"><circle r="16" /></g></svg>), // Render while dragging
);

const Square = draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="30" width="30" x="5" y="5"/></svg>), // Render while dragging
);

const Rect = draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="10" width="30" x="5" y="5"/></svg>), // Render while dragging
);

const MAP = {
	circle: (props) => (<circle className="handle" onDrag={(movement) => props.onComponentDrag(props.key, movement)} {...props} cx={props.x} cy={props.y} />),
	square: (props) => (<rect {...props} className="handle" onDrag={(movement) => props.onComponentDrag(props.key, movement)} fill={props.fill} height={props.size} width={props.size} x={props.x} y={props.y} /> ),
	rect: (props) => (<rect {...props} className="handle" onDrag={(movement) => props.onComponentDrag(props.key, movement)} fill={props.fill} height="10" width={props.size} x={props.x} y={props.y} /> )
};

class AppComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			droppedComponents: []
		};
	}

	onComponentDrag(index, movement) {
		let components = clone(this.state.droppedComponents);
		let {x, y, name} = components[index].props;

		components[index] = MAP[name]({
			...components[index].props,
			x: x - movement.x,
			y: y - movement.y,
			key: index
		});
		this.setState({
			droppedComponents: components
		});
	}

	onDropComponent(data) {
		const {x, y, props} = data;
		this.setState({
			droppedComponents: [
				...this.state.droppedComponents, MAP[props.name]({
					...props, x: x, y: y, key: this.state.droppedComponents.length,
					onComponentDrag: this.onComponentDrag.bind(this),
					onClick: () => console.log("click", props.name)
				})
			]
		});
	}

	render() {

		return (
			<div>

				<div style={{"display": "inline-block"}}>
					<Circle
						fill="rgb(0,0,0)"
						name="circle"
						onDrop={this.onDropComponent.bind(this)}
						r="16"
						/>
				</div>

				<div style={{"display": "inline-block"}}>
					<Square
						fill="rgb(0,0,0)"
						name="square"
						onDrop={this.onDropComponent.bind(this)}
						size="30" />
				</div>

				<div style={{"display": "inline-block"}}>
					<Rect
						name="rect"
						onDrop={this.onDropComponent.bind(this)}
						size="30"
					/>
				</div>

				<div style={{width: "100%", height: "500px"}}>
					<InfinityGrid>
						{this.state.droppedComponents}
					</InfinityGrid>
				</div>
			</div>
		);
	}
}

const App = DragDropContext(TouchBackend({ enableMouseEvents: true }))(AppComponent);

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<App />, document.getElementById("app"));
});
```
