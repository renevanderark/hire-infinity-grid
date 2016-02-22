import React from "react";
import draggable from "./draggable";

export default draggable(
	() => (<svg height="40" onDragStart={(ev) => ev.preventDefault()} width="40"><g transform="translate(20 20)"><circle r="16" /></g></svg>),
	(props) => (<circle {...props} r="16" />)
);