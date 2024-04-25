export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_DETAIL = "GET_EVENT_DETAIL";
export const GET_EVENT_DATE_DATA = "GET_EVENT_DATE_DATA";

const initialState = {
  getEvents: [],
  eventDetails: {},
  eventDateData: [],
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
    case GET_EVENT_DATE_DATA:
      const { idd, dataa } = action.payload;
      return {
        ...state,
        eventDateData: {
          ...state.eventDateData,
          [idd]: dataa,
        },
      };

    default:
      return state;
  }
};

export default eventReducer;
