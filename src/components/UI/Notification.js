import classes from "./Notification.module.css";
import { useSelector } from "react-redux";

const Notification = (props) => {
    const { status, title, message } = useSelector(state => state.cartSlice.notification);
  let specialClasses = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
