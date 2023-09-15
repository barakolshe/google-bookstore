import { Alert, Modal, Snackbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import PurchaseForm from "./PurchaseForm/PurchaseForm";

interface PurchaseModalProps {
  bookDetails: Book | null;
  open: boolean;
  handleClose: () => void;
}

const PurchaseModal: FunctionComponent<PurchaseModalProps> = ({
  bookDetails,
  open,
  handleClose,
}) => {
  const [purchasedBook, setPurchasedBook] = React.useState<string | null>(null);

  return (
    <>
      <Snackbar
        open={purchasedBook !== null}
        onClose={() => setPurchasedBook(null)}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setPurchasedBook(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {purchasedBook}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PurchaseForm
          handleClose={handleClose}
          shouldReset={!open}
          bookName={bookDetails !== null ? bookDetails.volumeInfo.title : ""}
          setPurchasedBook={setPurchasedBook}
        />
      </Modal>
    </>
  );
};

export default PurchaseModal;
