import apiService from "../Services";
import { GET_COURSES } from "../reducers/courseReducer";

export const getCourses = (data: any) => ({
  type: GET_COURSES,
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
