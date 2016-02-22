import React from "react";
import draggable from "./draggable";

export default draggable(
	() => (<svg height="40" width="40"><rect fill="rgb(0,0,0)" height="30" width="30" x="5" y="5"/></svg>),
	() => (<g transform="translate(-20 -20)"><rect fill="rgb(0,0,0)" height="30" onClick={() => console.log("SQUARE")} width="30" x="5" y="5" /></g> )
);