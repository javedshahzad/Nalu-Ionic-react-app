import apiService from "../Services";
import { GET_AVATAR } from "../reducers/menuReducer";

export const getAvatar = (data: any) => ({
  type: GET_AVATAR,
  payload: data,
});

export const fetchAvatar = (userId: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `https://app.mynalu.com/wp-json/wp/v2/users/${userId}`
      );
      dispatch(getAvatar(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
