import { JOURNAL_ACTION_TYPE } from "../actions/journalAction";

const initialState: any[] = [];

const journalReducer = (state = initialState, action: any) => {
  // console.log("Action:", action);

  console.log("data from reducer", action);
  // console.log("State before:", state);
  switch (action.type) {
    case JOURNAL_ACTION_TYPE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default journalReducer;
