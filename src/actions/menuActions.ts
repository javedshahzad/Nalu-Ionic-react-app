import apiService from "../Services";
import { GET_AVATAR } from "../reducers/menuReducer";

export const getAvatar = (data: any) => ({
  type: GET_AVATAR,
  payload: data,
});

const BASE_URL = process.env.BASE_URL;

export const fetchAvatar = (userId: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/wp/v2/users/${userId}`
      );
      dispatch(getAvatar(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
