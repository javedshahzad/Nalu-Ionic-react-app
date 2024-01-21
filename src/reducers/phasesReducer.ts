// phasesReducer.js

export const GET_COLORS = "GET_COLORS";
export const GET_ICONS = "GET_ICONS";

const initialState = {
  moonColors: [],
  moonIcons: [],
};

const phasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLORS:
      return { ...state, moonColors: action.payload };
    case GET_ICONS:
      return { ...state, moonIcons: action.payload };
    default:
      return state;
  }
};

export default phasesReducer;
