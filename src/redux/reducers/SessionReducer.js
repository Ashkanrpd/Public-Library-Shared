const initialState = {
  loggedIn: false,
  name: undefined,
  username: undefined,
  userId: undefined,
  redirectPath: "",
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      state.username = action.username;
      state.loggedIn = true;
      state.name = action.name;
      state.userId = action.userId;
      return;
    case "LOGOUT":
      state.username = "";
      state.loggedIn = false;
      state.name = "";
      state.userId = undefined;
      state.selectedCategory = undefined;
      state.categoriesOpen = true;
      state.searchQ = {};
      return;
    case "REDIRECT-PATH":
      state.redirectPath = action.path;
      return;
    default:
      return state;
  }
}
