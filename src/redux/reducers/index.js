const initialState = {
  favourite: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      return {
        ...state,
        favourite: { ...state.favourite, content: [...state.favourite.content, action.payload] },
      };

    case "REMOVE_TO_FAVOURITE":
      return {
        ...state,
        favourite: {
          ...state.favourite,
          content: state.favourite.content.filter((position) => position._id !== action.payload),
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
