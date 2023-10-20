import { createStore, combineReducers } from "redux";

import userReducer from "../reducers/usersReducer";
import groupsReducer from "../reducers/groupsReducer";
import notificationReducer from "../reducers/notificationReducer";

export interface RootState {
  users: ReturnType<typeof userReducer>;
  groups: ReturnType<typeof groupsReducer>;
  notifications: ReturnType<typeof notificationReducer>;
}

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  notifications: notificationReducer,
});

const store = createStore(rootReducer);

export default store;
