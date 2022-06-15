import { createStore,applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  //state ứng dụng
  
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
