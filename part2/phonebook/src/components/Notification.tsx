const Notification = (props: { message: string; messageType: string }) => {
  if (props.message === "") {
    return null;
  }
  if (props.messageType === "success") {
    return <div className="success">{props.message}</div>;
  } else {
    return <div className="error">{props.message}</div>;
  }
};

export default Notification;
