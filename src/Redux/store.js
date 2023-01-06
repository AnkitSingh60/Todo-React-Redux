import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk/src";
import { todoReducer } from "./Todo/reducer";


const reducer = combineReducers({

    todoReducer : todoReducer
})

export const store = createStore(reducer , applyMiddleware(thunk))   



