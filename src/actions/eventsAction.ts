import apiService from "../Services";
import { GET_EVENTS, GET_EVENT_DETAIL } from "../reducers/eventsReducer";

export const getEvents = (data: any) => ({
  type: GET_EVENTS,
  payload: data,
});
export const getEventDetail = (id, data: any) => ({
  type: GET_EVENT_DETAIL,
  payload: { id, data },
});

const BASE_URL = process.env.BASE_URL;

export const fetchEvents = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/events?lang=de`
      );
      dispatch(getEvents(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const fetchEventDetail = (id) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/event/${id}?lang=dee`
      );
      dispatch(getEventDetail(id, response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
