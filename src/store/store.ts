import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import userReducer from "../reducers/usersReducer";
import groupsReducer from "../reducers/groupsReducer";
import notificationReducer from "../reducers/notificationReducer";
import journalReducer from "../reducers/journalReducer";
import phasesReducer from "../reducers/phasesReducer";

export interface RootState {
  users: ReturnType<typeof userReducer>;
  groups: ReturnType<typeof groupsReducer>;
  notifications: ReturnType<typeof notificationReducer>;
  journalReducer: ReturnType<typeof journalReducer>;
  phasesReducer: ReturnType<typeof phasesReducer>;
}

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  notifications: notificationReducer,
  journalReducer: journalReducer,
  phasesReducer: phasesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
