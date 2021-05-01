import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILURE,
  ADD_WATCHLIST_REQUEST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_FAILURE,
  REMOVE_WATCHLIST_REQUEST,
  REMOVE_WATCHLIST_SUCCESS,
  REMOVE_WATCHLIST_FAILURE,
} from "redux/constants";

const inititalState = {
  isLoading: false,
  watchlist: {},
  isAdding: false,
  isRemoving: false,
};
const watchlistReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_WATCHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        watchlist: {...action.payload},
      };
    case GET_WATCHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_WATCHLIST_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case ADD_WATCHLIST_SUCCESS:
      return {
        ...state,
        isAdding: false,
        watchlist: {
          ...state.watchlist,
          [action.payload.id]: action.payload.watchlist,
        },
      };
    case ADD_WATCHLIST_FAILURE:
      return {
        ...state,
        isAdding: false,
      };

    case REMOVE_WATCHLIST_REQUEST:
      return {
        ...state,
        isRemoving: true,
      };
    case REMOVE_WATCHLIST_SUCCESS:
      // chuyển đổi object thành array để filter
      // r đổi lại thành object cho phù hợp data in firebase
      const asArray = Object.entries(state.watchlist);
      const as = asArray.filter(([key, value])=> value.id !== action.payload.id);
      return {
        ...state,
        isRemoving: false,
        watchlist: Object.fromEntries(as),
      };


    case REMOVE_WATCHLIST_FAILURE:
      return {
        ...state,
        isRemoving: false,
      };
    default:
      return state;
  }
};
export default watchlistReducer;
