import Button from "@/components/common/Button/Button";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import usePurchaseForm from "./usePurchaseForm";

interface PurchaseFormProps {
  handleClose: () => void;
  bookName: string;
  shouldReset: boolean;
  setPurchasedBook: (bookName: string) => void;
}

const PurchaseForm: FunctionComponent<PurchaseFormProps> = React.forwardRef(
  ({ handleClose, bookName, shouldReset, setPurchasedBook }) => {
    const { registers, onSubmit, formErrors } = usePurchaseForm({
      handleClose,
      bookName,
      shouldReset,
      setPurchasedBook,
    });

    return (
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
          {bookName}
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
    );
  }
);

export default PurchaseForm;
