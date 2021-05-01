import { auth } from "../../firebase";
import { db } from "../../firebase";
import firebase from "firebase/app";
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

export const getWatchlistRequest = () => ({ type: GET_WATCHLIST_REQUEST });
export const getWatchlistSuccess = (watchlist) => ({
  type: GET_WATCHLIST_SUCCESS,
  payload:  watchlist ,
});
export const getWatchlistFailure = () => ({ type: GET_WATCHLIST_FAILURE });

export const addWatchlistRequest = () => ({ type: ADD_WATCHLIST_REQUEST });
export const addWatchlistSuccess = (id, watchlist) => ({
  type: ADD_WATCHLIST_SUCCESS,
  payload: { id, watchlist },
});
export const addWatchlistFailure = () => ({ type: ADD_WATCHLIST_FAILURE });

export const removeWatchlistRequest = (id) => ({
  type: REMOVE_WATCHLIST_REQUEST,
  payload: id,
});
export const removeWatchlistSuccess = (id) => ({
  // state ben reducer là object thì phải trả về object
  type: REMOVE_WATCHLIST_SUCCESS,
  payload: { id },
});
export const removeWatchlistFailure = () => ({
  type: REMOVE_WATCHLIST_FAILURE,
});

export const fetchWatchlist = (uid) => async (dispatch) => {
  try {
    dispatch(getWatchlistRequest());
    const requestWatchlist = await db.collection("watchlist").doc(uid).get();
    dispatch(getWatchlistSuccess(requestWatchlist.data()));
  } catch (err) {
    dispatch(getWatchlistFailure(err));
    throw err;
  }
};

export const addMovie = (id, movie) => async (dispatch) => {
  dispatch(addWatchlistRequest());
  const { currentUser } = auth;
  if (currentUser) {
    const { uid } = currentUser;
    const docRef = db.collection("watchlist").doc(uid);
    // merge dùng để nối cái data lại khi thêm nhiều data trong 1 document
    // [id] không phải cố định key là id mà thay đổi id khi được truyền id
    // vd: id cố định => id: ....
    //      id không cố định => [value.id]: .....
    docRef
      .set({ [id]: movie }, { merge: true })
      .then(() => {
        dispatch(addWatchlistSuccess(id, movie));
      })
      .catch((err) => dispatch(addWatchlistFailure(err)));
  }
};
export const removeMovie = (id) => async (dispatch) => {
  dispatch(removeWatchlistRequest());
  const { currentUser } = auth;
  if (currentUser) {
    const { uid } = currentUser;
    const docRef = db.collection("watchlist").doc(uid);

    docRef
      .update({ [id]: firebase.firestore.FieldValue.delete() })
      .then(() => {
        dispatch(removeWatchlistSuccess(id));
      })
      .catch((err) => dispatch(removeWatchlistFailure(err)));
  }
};
