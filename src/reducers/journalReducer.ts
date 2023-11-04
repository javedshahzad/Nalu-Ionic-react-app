import { JOURNAL_ACTION_TYPE } from "../actions/journalAction";

const initialState: any[] = [];

const journalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case JOURNAL_ACTION_TYPE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default journalReducer;
