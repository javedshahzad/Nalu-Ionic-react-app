export const GET_COURSES = "GET_COURSES";
export const GET_NEXT_CHAPTER = "GET_NEXT_CHAPTER";
export const GET_CHAPTER = "GET_CHAPTER";

const initialState = {
  getCourses: [],
  getChapter: [],
  getNextChapter: [],
};

const courseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, getCourses: action.payload };
    case GET_CHAPTER:
      return { ...state, getChapter: action.payload };
    case GET_NEXT_CHAPTER:
      return { ...state, getNextChapter: action.payload };

    default:
      return state;
  }
};

export default courseReducer;
