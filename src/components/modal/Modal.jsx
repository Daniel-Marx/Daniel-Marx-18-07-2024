import React, { useEffect, useState } from "react";
import s from "./Modal.module.scss";

const Modal = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.classList.add(s.noScroll);
    return () => {
      document.body.classList.remove(s.noScroll);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 450);
  };

  return (
    <div
      className={`${s.overlay} ${s.open} ${isClosing ? s.closing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${s.modal} ${isClosing ? s.hide : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.header}>
          <h2>Oh no!</h2>
        </div>
        <div className={s.body}>
          <p>{message}</p>
        </div>
        <div className={s.footer}>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
