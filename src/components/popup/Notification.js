import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./notification.css";

const Notification = ({ message, duration, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      const hideTimer = setTimeout(() => {
        onClose();
      }, 500); // 애니메이션 시간 (0.5초)에 맞춰서 onClose 호출
      return () => clearTimeout(hideTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${visible ? "fade-in" : "fade-out"}`}>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  duration: 700,
};

export default Notification;
