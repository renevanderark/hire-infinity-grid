import expect from "expect";
import { setViewportRect, moveViewport } from "../../src/actions";

describe("actions", () => { //eslint-disable-line no-undef

	const dispatch = (func, assert, getState = () => {}) => {
		const redispatch = (obj) => assert(obj);
		func(redispatch, getState);
	};

	describe("setViewportRect", () => { //eslint-disable-line no-undef
		it("should set the size of the viewport and its top left DOM position based on given rect", (done) => { //eslint-disable-line no-undef
			const rect = {
				top: 15,
				left: 20,
				width: 150,
				height: 200
			};
			const initialState = {
				grid: {
					viewBox: [15, 25, 50, 50],
					domPos: {x: 70, y: 80}
				}
			};

			dispatch(setViewportRect(rect), (obj) => {
				try {
					expect(obj).toEqual({
						type: "SET_VIEWBOX_RECT",
						domPos: { x: rect.left, y: rect.top },
						viewBox: [
							initialState.grid.viewBox[0],
							initialState.grid.viewBox[1],
							rect.width, rect.height
						]
					});
					done();
				} catch (e) {
					done(e);
				}
			}, () => initialState);
		});
	});

	describe("moveViewport", () => { //eslint-disable-line no-undef
		it("should move the viewBox top left position by given movement", (done) => {  //eslint-disable-line no-undef
			const movement = {x: 15, y: 20};
			const initialState = {
				grid: {
					viewBox: [15, 25, 50, 50],
					domPos: {x: 70, y: 80}
				}
			};

			dispatch(moveViewport(movement), (obj) => {
				try {
					expect(obj).toEqual({
						type: "SET_VIEWBOX_RECT",
						domPos: initialState.grid.domPos,
						viewBox: [
							initialState.grid.viewBox[0] + movement.x,
							initialState.grid.viewBox[1] + movement.y,
							initialState.grid.viewBox[2],
							initialState.grid.viewBox[3]
						]
					});
					done();
				} catch (e) {
					done(e);
				}
			}, () => initialState);
		});
	});
});