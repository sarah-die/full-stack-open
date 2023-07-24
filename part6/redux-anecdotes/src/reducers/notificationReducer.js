import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "A Message",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
    }
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
