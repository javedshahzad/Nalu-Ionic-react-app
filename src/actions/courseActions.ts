import apiService from "../Services";
import { GET_COURSES, GET_COURSES_INNER } from "../reducers/courseReducer";

export const getCourses = (data: any) => ({
  type: GET_COURSES,
  payload: data,
});
export const getCoursesInner = (data: any) => ({
  type: GET_COURSES_INNER,
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
export const fetchCoursesInner = (id: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/course-step/${id}`
      );
      dispatch(getCoursesInner(response));
      dispatch(fetchCourses());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
