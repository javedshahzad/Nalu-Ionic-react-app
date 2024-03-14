export const GET_JOURNAL_ENTRIES = "GET_JOURNAL_ENTRIES";

const initialState = {
  getJournalEntries: [],
};

const journalEntriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_JOURNAL_ENTRIES:
      return { ...state, getJournalEntries: action.payload };

    default:
      return state;
  }
};

export default journalEntriesReducer;
