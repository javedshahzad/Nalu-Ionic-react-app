export const CLEAR_JOURNAL = "CLEAR_JOURNAL";
export const JOURNAL_ACTION_TYPE = "JOURNAL_ACTION_TYPE";
const initialState: any[] = [];

const journalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case JOURNAL_ACTION_TYPE:
      return [...state, action.payload];
    case CLEAR_JOURNAL:
      return initialState;
    default:
      return state;
  }
};

export default journalReducer;
