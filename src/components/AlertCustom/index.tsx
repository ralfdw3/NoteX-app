import React, { useEffect, useState } from "react";
import { Alert } from "antd";

interface AlertProps {
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  description: string;
  timeOut?: number;
}

const AlertCustom: React.FC<AlertProps> = ({
  type,
  message,
  description,
  timeOut = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleTimeOut() {
      setTimeout(() => {
        setVisible(false);
      }, timeOut);
    }
    if (visible && timeOut) {
      handleTimeOut();
    }
  }, [visible, timeOut]);

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeOut);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, timeOut]);

  return (
    <>
      {visible && (
        <Alert
          message={message}
          type={type}
          showIcon
          description={description}
          onClose={() => setVisible(false)}
        />
      )}
    </>
  );
};
export default AlertCustom;
