import TextField from "@/components/common/TextField/TextFIeld";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

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
            <TextField placeholder="Name" label="Name" />
            <TextField placeholder="Phone Number" label="Phone Number" />
            <TextField placeholder="Email" label="Email" />
            <TextField placeholder="Address" label="Address" />
          </Box>
        </Paper>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default PurchaseModal;
