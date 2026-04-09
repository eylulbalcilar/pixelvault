import { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  // REVIEW: `onClose` is used inside this effect but missing from the dependency array. If the
  // parent re-renders with a new onClose reference, this effect won't re-run. Add onClose to
  // the array or wrap it in useCallback in the parent.
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  // REVIEW: No way for users to manually dismiss the notification (e.g. a close/X button).
  // They must wait the full 3 seconds.
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
