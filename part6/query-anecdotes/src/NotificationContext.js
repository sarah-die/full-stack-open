import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `New anecdote created: ${action.payload}`;
    case "VOTE":
      return `anecdote "${action.payload}" voted`;
    case "SET_NOTIFICATION":
      return action.payload;
    case "REMOVE":
      return "";
    default:
      throw new Error("Error in notificationReducer");
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[1];
};

export default NotificationContext;
