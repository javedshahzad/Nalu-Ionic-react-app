export const GET_COURSES = "GET_COURSES";
export const GET_COURSES_INNER = "GET_COURSES_INNER";

const initialState = {
  getCourses: [],
  getCoursesInner: [],
};

const courseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, getCourses: action.payload };
    case GET_COURSES_INNER:
      return { ...state, getCoursesInner: action.payload };

    default:
      return state;
  }
};

export default courseReducer;
