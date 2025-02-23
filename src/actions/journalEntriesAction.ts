import apiService from "../Services";
import { GET_JOURNAL_ENTRIES } from "../reducers/journalEntriesReducer";

export const getJournalEntries = (data: any) => ({
  type: GET_JOURNAL_ENTRIES,
  payload: data,
});

const BASE_URL = process.env.BASE_URL;

export const fetchJournalEntries = (dateParam: any) => {
  return async (dispatch: any) => {
    try {
      const response = apiService.get(
        `${BASE_URL}/wp-json/nalu-app/v1/journal/${dateParam}?lang=de`
      );
      dispatch(getJournalEntries(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
