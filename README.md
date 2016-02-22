Infinity Grid
===

[Demo here](http://renevanderark.github.io/infinity-grid/)


```javascript
import React from "react";
import ReactDOM from "react-dom";

import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, draggable } from "infinity-grid";


const Circle = draggable(
	() => (<svg height="40" width="40"><g transform="translate(20 20)"><circle r="16" /></g></svg>), // Render while dragging
	(props) => (<circle {...props} r="16" />) // Render dropped
);

const Square = draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="30" width="30" x="5" y="5"/></svg>), // Render while dragging
	(props) => (<g transform="translate(-20 -20)"><rect {...props} fill="rgb(0,0,0)" height="30" width="30" x="5" y="5" /></g> ) // Render dropped
);

class AppComponent extends React.Component {

	render() {

		return (
			<div>
				<div style={{"display": "inline-block"}}><Circle onClick={() => console.log("circle") } /></div>
				<div style={{"display": "inline-block"}}><Square onClick={() => console.log("square") } /></div>
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
