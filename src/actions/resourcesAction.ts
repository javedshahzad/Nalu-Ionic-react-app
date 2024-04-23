import apiService from "../Services";
import {
  GET_RESOURCES_OVERVIEW,
  GET_RESOURCES_FAVOURITE,
  GET_RESOURCES_RECOMMENDATION,
} from "../reducers/resourcesReducer";

export const getResourcesOverView = (data: any) => ({
  type: GET_RESOURCES_OVERVIEW,
  payload: data,
});
export const getResourcesFavourite = (data: any) => ({
  type: GET_RESOURCES_FAVOURITE,
  payload: data,
});
export const getResourcesRecommendation = (data: any) => ({
  type: GET_RESOURCES_RECOMMENDATION,
  payload: data,
});

const BASE_URL = process.env.BASE_URL;

export const fetchResourcesOverview = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/parent-categories`
      );
      dispatch(getResourcesOverView(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const fetchResourcesFavourite = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/ressources?favourite=true`
      );
      dispatch(getResourcesFavourite(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const fetchResourcesRecommendation = () => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`
      );
      dispatch(getResourcesRecommendation(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
