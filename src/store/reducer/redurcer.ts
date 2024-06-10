import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import todos from "../services/services";

const reducer = combineReducers({
  todos,
});

const store = configureStore({
  reducer,
})

export default store;
