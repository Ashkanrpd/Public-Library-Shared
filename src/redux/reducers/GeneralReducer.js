const initialState = {
  searchQ: {},
  items: [],
  categories: [],
  selectedCategory: undefined,
  actionItem: undefined,
  categoriesOpen: true,
  language: "en",
};

// This is just a regular reducer, we appear to be "mutating" state but redux-immer helps us here later once we combine.
// We MUST return state at the end of each case.
export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH":
        state.searchQ = action.searchQ;
        return state;
      case "GET_ITEMS":
        state.items = action.items;
        return state;
      case "GET_CATEGORIES":
        state.categories = action.categories;
        return state;
      case "SELECTED_CATEGORY":
        state.selectedCategory = action.category;
        state.searchQ.input = "";
        return state;
      case "ACTION_ITEM":
        state.actionItem = action.item;
        return state;
      case "RESET-SEARCH":
        state.selectedCategory = action.category;
        state.searchQ = {};
        return state;
      case "ITEM-UPDATED":
        console.log(action.item._id);
        const index = state.items.findIndex(
          (item) => item._id === action.item._id
        );
        if (index === -1) return state;
        state.items[index] = action.item;
        state.actionItem = action.item;
        return state;
      case "CATEGORIES-OPEN":
        state.categoriesOpen = true;
        return state;
      case "CATEGORIES-CLOSE":
        state.categoriesOpen = false;
        return state;
      case "CHANGE-LANGUAGE":
        state.language = action.language;
        return state;
      default:
        return state;
    }
}
