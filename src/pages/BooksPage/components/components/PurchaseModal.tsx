import Button from "@/components/common/Button/Button";
import TextField from "@/components/common/TextField/TextFIeld";
import { Modal, Paper, Stack, Typography } from "@mui/material";
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
  const { registers, onSubmit, formErrors, _handleClose } =
    usePurchaseModal(handleClose);

  return (
    <Modal
      open={open}
      onClose={_handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {bookDetails !== null ? (
        <Paper
          sx={{
            width: { xs: "90%", sm: "500px" },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
          }}
        >
          <Typography variant="h4" align="center">
            {bookDetails.volumeInfo.title}
          </Typography>
          <Stack
            component="form"
            direction="column"
            gap={3}
            sx={{
              maxWidth: "50%",
              mt: 3,
              mx: "auto",
            }}
            onSubmit={onSubmit}
          >
            <TextField
              inputRef={registers.name.ref}
              {...registers.name.inputProps}
              placeholder="Name"
              label="Name"
              type="text"
              error={Boolean(formErrors.name)}
              helperText={formErrors.name?.message}
            />
            <TextField
              inputRef={registers.phoneNumber.ref}
              {...registers.phoneNumber.inputProps}
              placeholder="Phone Number"
              label="Phone Number"
              type="tel"
              error={Boolean(formErrors.phoneNumber)}
              helperText={formErrors.phoneNumber?.message}
            />
            <TextField
              inputRef={registers.email.ref}
              {...registers.email.inputProps}
              placeholder="Email"
              label="Email"
              type="email"
              error={Boolean(formErrors.email)}
              helperText={formErrors.email?.message}
            />
            <TextField
              inputRef={registers.address.ref}
              {...registers.address.inputProps}
              placeholder="Address"
              label="Address"
              multiline
              rows={2}
              error={Boolean(formErrors.address)}
              helperText={formErrors.address?.message}
            />
            <Button type="submit" sx={{ width: "70%", mx: "auto" }}>
              Purchase
            </Button>
          </Stack>
        </Paper>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default PurchaseModal;
