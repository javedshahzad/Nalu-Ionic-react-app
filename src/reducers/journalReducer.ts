const initialState: any[] = [];

const journalReducer = (state = initialState, action: any) => {
  console.log("Action:", action);
  console.log("State before:", state);
  switch (action.type) {
    default:
      return [action.payload];
  }
};

export default journalReducer;
