export const GET_EVENTS = "GET_EVENTS";

const initialState = {
  getEvents: [],
};

const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, getEvents: action.payload };

    default:
      return state;
  }
};

export default eventReducer;
