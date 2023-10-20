const initialState: any = [];

const groupsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CREATE_GROUP":
      return [...state, action.payload];

    case "GROUPS_LIST":
      return action.payload;

    default:
      return state;
  }
};

export default groupsReducer;
