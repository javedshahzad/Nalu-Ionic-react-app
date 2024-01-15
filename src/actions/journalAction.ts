// Make sure to import your action types

import { CLEAR_JOURNAL, JOURNAL_ACTION_TYPE } from "../reducers/journalReducer";
import { GET_COLORS, GET_ICONS } from "../reducers/phasesReducer";

export const clearJournal = () => ({
  type: CLEAR_JOURNAL,
});

export const journalAction = (data: any) => ({
  type: JOURNAL_ACTION_TYPE,
  payload: data,
});
export const getColors = (data: any) => ({
  type: GET_COLORS,
  payload: data,
});
export const getMoonIcons = (data: any) => ({
  type: GET_ICONS,
  payload: data,
});
