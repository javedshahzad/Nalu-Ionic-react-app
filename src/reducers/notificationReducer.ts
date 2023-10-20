import { Reducer } from "redux";

// Initial state
const initialState = {
  notifications: [],
};

// Reducer
const reducer: Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      // Check if the notification already exists in the array
      const isNotificationExist = state.notifications.some(
        (notification: any) => notification.id === action.payload.id
      );

      if (!isNotificationExist) {
        // Add the new notification only if it's not a duplicate
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
        };
      }

      return state; // If it's a duplicate, return the current state
    }
    default:
      return state;
  }
};

export default reducer;
