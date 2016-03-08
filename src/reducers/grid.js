let initialState = {
	viewBox: [0, 0, 0, 0],
	domPos: {x: 0, y: 0}
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VIEWBOX_RECT":
			return {
				...state, viewBox: action.viewBox, domPos: action.domPos
			};
		default:
			return state;
	}

}