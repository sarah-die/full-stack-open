const Notification = (props: { message: string }) => {
  if (props.message === "") {
    return null;
  }

  return <div className="success">{props.message}</div>;
};

export default Notification;
