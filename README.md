Infinity Grid
===

[Demo here](http://renevanderark.github.io/hire-infinity-grid/)


```javascript
import React from "react";
import ReactDOM from "react-dom";

import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, draggable, actions } from "infinity-grid";


const Circle = draggable(
	() => (<svg height="40" width="40"><g transform="translate(20 20)"><circle r="16" /></g></svg>), // Render while dragging
	(props) => (<circle className="handle" {...props} />) // Render dropped
);

const Square = draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="30" width="30" x="5" y="5"/></svg>), // Render while dragging
	(props) => (<g transform="translate(-20 -20)"><rect {...props} className="handle" fill={props.fill} height={props.size} width={props.size} x="5" y="5" /></g> ) // Render dropped
);

const Rect = draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="10" width="30" x="5" y="5"/></svg>), // Render while dragging
	(props) => (<g transform="translate(-20 -20)"><rect {...props} className="handle" fill={props.fill} height="10" width={props.size} x="5" y="5" /></g> ) // Render dropped
);

class AppComponent extends React.Component {

	render() {

		return (
			<div>

				<div style={{"display": "inline-block"}}>
					<Circle
						fill="rgb(0,0,0)"
						onDeselect={(idx) => actions.onSetComponentProps({r: 16, fill: "rgb(0,0,0)"}, idx) }
						onSelect={(idx) => actions.onSetComponentProps({r: 20, fill: "rgb(0,0,255)"}, idx) }
						r="16"
						/>
				</div>

				<div style={{"display": "inline-block"}}>
					<Square
						fill="rgb(0,0,0)"
						onDeselect={(idx) => actions.onSetComponentProps({size: 30, fill: "rgb(0,0,0)"}, idx) }
						onSelect={(idx) => actions.onSetComponentProps({size: 40, fill: "rgb(0,0,255)"}, idx) }
						size="30" />
				</div>

				<div style={{"display": "inline-block"}}>
					<Rect
						onDeselect={(idx) => actions.onSetComponentProps({size: 30, fill: "rgb(0,0,0)"}, idx) }
						onSelect={(idx) => actions.onSetComponentProps({size: 40, fill: "rgb(0,0,255)"}, idx) }
						size="30"
					/>
				</div>

				<div style={{width: "100%", height: "500px"}}>
					<InfinityGrid />
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
