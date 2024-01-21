import { GET_COLORS, GET_ICONS } from "../reducers/phasesReducer";

export const getColors = (data: any) => ({
  type: GET_COLORS,
  payload: data,
});
export const getMoonIcons = (data: any) => ({
  type: GET_ICONS,
  payload: data,
});
