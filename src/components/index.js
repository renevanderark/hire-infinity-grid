import React from "react";
import InfinityGrid from "./infinity-grid";
import Components from "./components";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class App extends React.Component {
	render() {
		return (<div style={{width: "100%", height: "400px"}}>
			<InfinityGrid {...this.props.grid} actions={this.props.actions} />
			<Components />
		</div>);
	}
}

App.propTypes = {
	actions: React.PropTypes.object,
	grid: React.PropTypes.object
};

export default DragDropContext(HTML5Backend)(App);