// import { combineReducers } from "redux";
// import hobbyReducer from "./hobby";

// const rootReducer = combineReducers({
//   hobby: hobbyReducer,
// });
// export default rootReducer;

import { combineReducers } from "redux";
import userReducer from "./user";
import watchlistReducer from "./watchlist";

const rootReducer = combineReducers({
  user: userReducer,
  watchlist: watchlistReducer,
});
export default rootReducer;
