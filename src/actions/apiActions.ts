import { Dispatch } from "redux";
import { getMoonIcons, getColors } from "../actions/moonPhases";
import axios from "axios";
import { RootState } from "../store/store"; // Update this import with the correct path to your RootState
import MoonPhasesService from "../MoonPhasesService";

const BASE_URL = process.env.BASE_URL;

export const fetchMoonIcons = (year: any) => {
  return async (dispatch: any) => {
    try {
      const response = MoonPhasesService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/moon/${year}`
      );
      dispatch(getMoonIcons(response));
    } catch (error) {
      console.error("Error fetching moon icons:", error);
    }
  };
};

export const fetchColors = (year: any) => {
  return async (dispatch: any) => {
    try {
      const response = MoonPhasesService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/journal-overview/${year}?lang=de`
      );
      dispatch(getColors(response));
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };
};
