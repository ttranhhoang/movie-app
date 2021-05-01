// import { createStore } from "redux";
// import rootReducer from "./reducers";
// const store = createStore(rootReducer);
// export default store;
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = (initialState, firebase) => {
  const middleware = [thunk.withExtraArgument(firebase)];
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
export default store;