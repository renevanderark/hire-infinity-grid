import clone from "clone-deep";
import setIn from "./util/set-in";

let initialState = {
	viewBox: [0, 0, 0, 0],
	gridSize: 100,
	components: [],
	domPos: {x: 0, y: 0}
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VIEWBOX_RECT":
			return {
				...state, viewBox: action.viewBox, domPos: action.domPos
			};
		case "ADD_COMPONENT":
			return {
				...state,
				components: setIn([state.components.length], {
					x: action.x,
					y: action.y,
					props: action.props,
					component: action.component
				}, clone(state.components))
			};
		case "MOVE_COMPONENT":
			const idx = action.idx;
			return {
				...state,
				components: setIn([idx], {
					x: state.components[idx].x - action.movement.x,
					y: state.components[idx].y - action.movement.y,
					props: state.components[idx].props,
					component: state.components[idx].component
				}, clone(state.components))
			};
		default:
			return state;
	}

}