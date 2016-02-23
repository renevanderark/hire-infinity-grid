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

const moveComponent = (movement, idx) => (dispatch) => {
	dispatch({
		type: "MOVE_COMPONENT",
		movement: movement,
		idx: idx
	});
};

const setComponentProps = (props, idx) => (dispatch) => {
	dispatch({
		type: "SET_COMPONENT_PROPS",
		idx: idx,
		props: props
	});
};

const addComponent = (component, spec) => (dispatch, getState) => {
	dispatch({
		type: "ADD_COMPONENT",
		x: getState().grid.viewBox[0] + spec.x,
		y: getState().grid.viewBox[1] + spec.y,
		props: spec.props,
		component: component
	});
};

export default {
	onResize: (value) => store.dispatch(setViewportRect(value)),
	onDrag: (movement) => store.dispatch(moveViewport(movement)),
	onDragComponent: (movement, idx) => store.dispatch(moveComponent(movement, idx)),
	onSetComponentProps: (props, idx) => store.dispatch(setComponentProps(props, idx)),
	onAddComponent: (component, pos) => store.dispatch(addComponent(component, pos))
};