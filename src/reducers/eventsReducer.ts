export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_DETAIL = "GET_EVENT_DETAIL";

const generateUniqueId = () => {
  // Logic to generate a unique ID, for example:
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const initialState = {
  getEvents: [],
  eventDetails: {},
};

const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, getEvents: action.payload };
    case GET_EVENT_DETAIL:
      const { id, data } = action.payload;
      return {
        ...state,
        eventDetails: {
          ...state.eventDetails,
          [id]: data,
        },
      };

    default:
      return state;
  }
};

export default eventReducer;
