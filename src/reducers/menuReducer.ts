export const GET_AVATAR = "GET_AVATAR";

const initialState = {
  getAvatar: [],
};

const menuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_AVATAR:
      return { ...state, getAvatar: action.payload };

    default:
      return state;
  }
};

export default menuReducer;
