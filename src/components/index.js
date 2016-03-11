import React from "react";
import InfinityGrid from "./infinity-grid";
import actions from "../actions";
import store from "../store";


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();
		this.unsubscribe = store.subscribe(this.onState.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onState() {
		this.setState(store.getState());
	}

	render() {

		return (
			<div style={{width: "100%", height: "100%"}}>
				<InfinityGrid {...this.props} {...this.state.grid} actions={actions} />
			</div>
		);
	}
}

export default App;