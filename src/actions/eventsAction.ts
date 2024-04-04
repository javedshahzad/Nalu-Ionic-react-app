import apiService from "../Services";
import { GET_EVENTS } from "../reducers/eventsReducer";

export const getEvents = (data: any) => ({
  type: GET_EVENTS,
  payload: data,
});

export const fetchEvents = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/events?lang=de`
      );
      dispatch(getEvents(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
