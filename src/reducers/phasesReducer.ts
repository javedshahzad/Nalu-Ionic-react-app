export const GET_COLORS = "GET_COLORS";
export const GET_ICONS = "GET_ICONS";

const initialState: any[] = [];

const phasesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COLORS:
      return [...state, action.payload];
    case GET_ICONS:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default phasesReducer;
