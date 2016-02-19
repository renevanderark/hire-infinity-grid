import React from "react";
import Circle from "./circle";

class Components extends React.Component {
	render() {
		return (<div style={{width: "100%", height: "50px"}}>
			<Circle />
		</div>);
	}
}

Components.propTypes = {

};

export default Components;