import React from "react";
import InfinityGrid from "./infinity-grid";
import Components from "./components";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class App extends React.Component {
	render() {
		return (<div style={{width: "100%", height: "400px"}}>
			<InfinityGrid {...this.props} />
			<Components {...this.props} />
		</div>);
	}
}

App.propTypes = {

};

export default DragDropContext(HTML5Backend)(App);