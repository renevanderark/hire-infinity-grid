import React from "react";
import draggable from "./draggable";

export default draggable(() => (<svg height="40" width="40"><g transform="translate(20 20)"><circle r="20" /></g></svg>), () => (<circle r="20" onClick={() => console.log("test")}/>));