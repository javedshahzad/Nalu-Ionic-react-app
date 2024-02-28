import apiService from "../Services";
import {
  GET_COURSES,
  GET_NEXT_CHAPTER,
  GET_CHAPTER,
} from "../reducers/courseReducer";

export const getCourses = (data: any) => ({
  type: GET_COURSES,
  payload: data,
});
export const getNextChapter = (data: any) => ({
  type: GET_NEXT_CHAPTER,
  payload: data,
});
export const getChapter = (data: any) => ({
  type: GET_CHAPTER,
  payload: data,
});

export const fetchCourses = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/courses?lang=de`
      );
      dispatch(getCourses(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const fetchChapter = (id: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/course-step/${id}`
      );
      dispatch(getChapter(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const fetchNextChapter = (url: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(url);
      dispatch(getNextChapter(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
