import Button from "@/components/common/Button/Button";
import TextField from "@/components/common/TextField/TextFIeld";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import usePurchaseModal from "./usePurchaseModal";

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
  const { registers, onSubmit, formErrors } = usePurchaseModal();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {bookDetails !== null ? (
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
          }}
        >
          <Typography variant="h5" align="center">
            {bookDetails.volumeInfo.title}
          </Typography>
          <Box
            component="form"
            sx={{
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginTop: 3,
              marginX: "auto",
            }}
          >
            <TextField
              inputRef={registers.name.ref}
              {...registers.name.inputProps}
              placeholder="Name"
              label="Name"
            />
            <TextField
              inputRef={registers.phoneNumber.ref}
              {...registers.phoneNumber.inputProps}
              placeholder="Phone Number"
              label="Phone Number"
            />
            <TextField
              inputRef={registers.email.ref}
              {...registers.email.inputProps}
              placeholder="Email"
              label="Email"
            />
            <TextField
              inputRef={registers.address.ref}
              {...registers.address.inputProps}
              placeholder="Address"
              label="Address"
            />
            <Button>Purchase</Button>
          </Box>
        </Paper>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default PurchaseModal;
