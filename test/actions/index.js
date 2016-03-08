import expect from "expect";
import { setViewportRect, moveViewport } from "../../src/actions";

describe("actions", () => { //eslint-disable-line no-undef

	const dispatch = (func, assert, getState = () => {}) => {
		const redispatch = (obj) => assert(obj);
		func(redispatch, getState);
	};

	describe("setViewportRect", () => { //eslint-disable-line no-undef
		it("should set the size of the viewport and its top left DOM position based on given rect"); //eslint-disable-line no-undef
	});

	describe("moveViewport", () => { //eslint-disable-line no-undef
		it("should move the viewBox top left position by given movement"); //eslint-disable-line no-undef

	});
});