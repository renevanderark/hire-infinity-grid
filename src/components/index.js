import React from "react";
import InfinityGrid from "./infinity-grid";
import { DragDropContext } from "react-dnd";
import { default as TouchBackend } from "react-dnd-touch-backend";
// import HTML5Backend from "react-dnd-html5-backend";
import Circle from "./circle";



class App extends React.Component {
	render() {
		return (<div>
			<div style={{width: "100%", height: "400px"}}>
				<InfinityGrid {...this.props.grid} actions={this.props.actions} />
			</div>
			<div style={{width: "100%", height: "50px"}}>
				<Circle />
				<Circle />
			</div>
		</div>);
	}
}

App.propTypes = {
	actions: React.PropTypes.object,
	grid: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);