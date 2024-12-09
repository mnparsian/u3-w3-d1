const initialState = {
  companies: []
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      console.log("Reducer received:", action.payload);
      return {
        ...state,
        companies: [...state.companies, action.payload]
      };
    default:
      return state;
  }
};

export default mainReducer;
