import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import userReducer from "../reducers/usersReducer";
import groupsReducer from "../reducers/groupsReducer";
import notificationReducer from "../reducers/notificationReducer";
import journalReducer from "../reducers/journalReducer";
import phasesReducer from "../reducers/phasesReducer";
import menuReducer from "../reducers/menuReducer";
import courseReducer from "../reducers/courseReducer";
import eventsReducer from "../reducers/eventsReducer";
import journalEntriesReducer from "../reducers/journalEntriesReducer";
import resourcesReducer from "../reducers/resourcesReducer";

export interface RootState {
  users: ReturnType<typeof userReducer>;
  groups: ReturnType<typeof groupsReducer>;
  notifications: ReturnType<typeof notificationReducer>;
  journalReducer: ReturnType<typeof journalReducer>;
  phasesReducer: ReturnType<typeof phasesReducer>;
  menuReducer: ReturnType<typeof menuReducer>;
  eventsReducer: ReturnType<typeof eventsReducer>;
  courseReducer: ReturnType<typeof courseReducer>;
  journalEntriesReducer: ReturnType<typeof journalEntriesReducer>;
  resourcesReducer: ReturnType<typeof resourcesReducer>;
}

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  notifications: notificationReducer,
  journalReducer: journalReducer,
  phasesReducer: phasesReducer,
  menuReducer: menuReducer,
  eventsReducer: eventsReducer,
  courseReducer: courseReducer,
  journalEntriesReducer: journalEntriesReducer,
  resourcesReducer: resourcesReducer,
});

const composeEnhancers =
  window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export default store;
