import expect from "expect";
import gridReducer from "../../src/reducers/grid";


describe("entity reducer", () => { //eslint-disable-line no-undef
	it("should SET_VIEWBOX_RECT", () => { //eslint-disable-line no-undef
		expect(gridReducer({
			viewBox: [0, 0, 0, 0], domPos: {x: 0, y: 0}
		}, {type: "SET_VIEWBOX_RECT", viewBox: [1, 2, 30, 40], domPos: {x: 10, y: 10}}))
		.toEqual({
			viewBox: [1, 2, 30, 40], domPos: {x: 10, y: 10}
		});
	});
});