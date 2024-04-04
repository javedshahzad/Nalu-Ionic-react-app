export const GET_RESOURCES_OVERVIEW = "GET_RESOURCES_OVERVIEW";
export const GET_RESOURCES_FAVOURITE = "GET_RESOURCES_FAVOURITE";
export const GET_RESOURCES_RECOMMENDATION = "GET_RESOURCES_RECOMMENDATION";

const initialState = {
  getResourcesOverview: [],
  getResourcesFavourite: [],
  getResourcesRecommendation: [],
};

const resourcesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_RESOURCES_OVERVIEW:
      return { ...state, getResourcesOverview: action.payload };
    case GET_RESOURCES_FAVOURITE:
      return { ...state, getResourcesFavourite: action.payload };
    case GET_RESOURCES_RECOMMENDATION:
      return { ...state, getResourcesRecommendation: action.payload };

    default:
      return state;
  }
};

export default resourcesReducer;
