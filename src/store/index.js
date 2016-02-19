import {createStore, applyMiddleware, combineReducers} from "redux";
import reducers from "../reducers";
import thunkMiddleware from "redux-thunk";

let data = combineReducers(reducers);

export default createStore(data, applyMiddleware(thunkMiddleware));