export const GET_COURSES = "GET_COURSES";

const initialState = {
  getCourses: [],
};

const courseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, getCourses: action.payload };

    default:
      return state;
  }
};

export default courseReducer;
