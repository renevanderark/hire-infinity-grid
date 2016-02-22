import clone from "clone-deep";
import setIn from "./util/set-in";

let initialState = {
	viewBox: [0, 0, 0, 0],
	gridSize: 100,
	components: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VIEWBOX_RECT":
			return {
				...state, viewBox: action.viewBox
			};
		case "ADD_COMPONENT":
			return {
				...state,
				components: setIn([state.components.length], {
					x: action.x,
					y: action.y,
					component: action.component
				}, clone(state.components))
			};
		default:
			return state;
	}

}