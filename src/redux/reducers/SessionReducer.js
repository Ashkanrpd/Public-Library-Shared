// All the state concerned with a session should go here
const initialState = {
  loggedIn: false,
  name: undefined,
  username: undefined,
  userId: undefined,
  redirectPath: "",
};

// This is just a regular reducer, we appear to be "mutating" state but redux-immer helps us here later once we combine.
// We MUST return state at the end of each case.
export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      state.username = action.username;
      state.loggedIn = true;
      state.name = action.name;
      state.userId = action.userId;
      return state;
    case "LOGOUT":
      state.username = "";
      state.loggedIn = false;
      state.name = "";
      state.userId = undefined;
      state.selectedCategory = undefined;
      state.categoriesOpen = true;
      state.searchQ = {};
      return state;
    case "REDIRECT-PATH":
      state.redirectPath = action.path;
      return state;
    default:
      return state;
  }
}
