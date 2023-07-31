import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload;
  case 'CLEAR':
    return null;
  default:
    return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  const dispatch = valueAndDispatch[1];
  return (payload) => {
    dispatch({ type: 'SET', payload });
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);
  };
};

export default NotificationContext;
