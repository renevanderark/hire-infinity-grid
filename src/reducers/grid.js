import setIn from "./util/set-in";
import clone from "./util/clone-deep";

let initialState = {
	viewBox: [0, 0, 0, 0],
	gridSize: 100,
	components: [],
	domPos: {x: 0, y: 0}
};

export default function(state=initialState, action) {
	let idx;
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
				}, state.components)
			};
		case "MOVE_COMPONENT":
			idx = action.idx;
			if(typeof state.components[idx] === "undefined") { return state; }
			return {
				...state,
				components: setIn([idx], {
					x: state.components[idx].x - action.movement.x,
					y: state.components[idx].y - action.movement.y,
					props: state.components[idx].props,
					component: state.components[idx].component
				}, state.components)
			};
		case "SET_COMPONENT_PROPS":
			idx = action.idx;
			return {
				...state,
				components: setIn([idx, "props"], {
					...state.components[idx].props,
					...action.props
				}, state.components)
			};

		case "SELECT_COMPONENT":
			idx = action.idx;

			return {
				...state,
				components: clone(state.components).map((c, i) => {
					return {...c, props: {...c.props, selected: i === idx}};
				})
			};
		default:
			return state;
	}

}