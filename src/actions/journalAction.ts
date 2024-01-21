// Make sure to import your action types

import { CLEAR_JOURNAL, JOURNAL_ACTION_TYPE } from "../reducers/journalReducer";

export const clearJournal = () => ({
  type: CLEAR_JOURNAL,
});

export const journalAction = (data: any) => ({
  type: JOURNAL_ACTION_TYPE,
  payload: data,
});
