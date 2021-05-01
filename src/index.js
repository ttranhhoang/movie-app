import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase, { auth } from "./firebase";
import { authInfoSuccess } from "redux/actions/user";
const stores = store({}, firebase);
// luôn đảm bào rằng khi có user thì mới load user trước còn data load sau
auth.onAuthStateChanged(async (user) => {
  stores.dispatch(authInfoSuccess(user));
  ReactDOM.render(
    <Provider store={stores}>
      <React.Fragment>
        <App />
      </React.Fragment>
    </Provider>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
