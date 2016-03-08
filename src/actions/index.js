import store from "../store";

const setViewportRect = (rect) => (dispatch, getState) => {
	dispatch({
		type: "SET_VIEWBOX_RECT",
		viewBox: [getState().grid.viewBox[0], getState().grid.viewBox[1], Math.floor(rect.width) - 2, Math.floor(rect.height) - 2],
		domPos: {x: rect.left, y: rect.top}
	});
};

const moveViewport = (movement) => (dispatch, getState) => {
	const newX = getState().grid.viewBox[0] + movement.x;
	const newY = getState().grid.viewBox[1] + movement.y;
	dispatch({
		type: "SET_VIEWBOX_RECT",
		viewBox: [newX, newY, getState().grid.viewBox[2], getState().grid.viewBox[3]],
		domPos: getState().grid.domPos

	});
};


export default {
	onResize: (value) => store.dispatch(setViewportRect(value)),
	onDrag: (movement) => store.dispatch(moveViewport(movement))
};

export { setViewportRect, moveViewport };