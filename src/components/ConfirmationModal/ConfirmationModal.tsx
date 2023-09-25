import React from "react";
import Typography from "../Typography/Typography";
import styles from "./ConfirmationModal.module.css";
import Button from "../Button/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  text,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <Typography
          variant="h3"
          color="primary"
          font="bebasNeue"
          children={text}
          className={styles.modalTitle}
        />
        <div className={styles.buttons}>
          <Button
            text={"Confirm"}
            onClick={handleConfirm}
            className={styles.btn}
          />
          <Button text={"Cancel"} onClick={onClose} className={styles.btn} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
