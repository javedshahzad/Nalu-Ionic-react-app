import { createStore, combineReducers } from "redux";

import userReducer from "../reducers/usersReducer";
import groupsReducer from "../reducers/groupsReducer";
import notificationReducer from "../reducers/notificationReducer";
import journalReducer from "../reducers/journalReducer";

export interface RootState {
  users: ReturnType<typeof userReducer>;
  groups: ReturnType<typeof groupsReducer>;
  notifications: ReturnType<typeof notificationReducer>;
  journalReducer: ReturnType<typeof journalReducer>;
}

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  notifications: notificationReducer,
  journalReducer: journalReducer,
});

const store = createStore(rootReducer);

export default store;
