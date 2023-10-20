export interface User {
  id: number;
  name: string;
  display_image: string;
}

const initialState: User[] = [];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
