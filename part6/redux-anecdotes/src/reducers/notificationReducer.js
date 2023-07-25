import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Messages appear here",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

let timeOutId = null;

export const displayNotification = (text, time) => {
  return async (dispatch) => {
    if (timeOutId) clearTimeout(timeOutId);
    dispatch(setNotification(text));
    timeOutId = setTimeout(() => {
      dispatch(removeNotification(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
