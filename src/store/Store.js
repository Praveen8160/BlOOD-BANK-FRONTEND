import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authreducer from "./AuthReducer";

const rootReducer = combineReducers({
  Auth: authreducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;