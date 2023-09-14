import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormRegister, useForm } from "react-hook-form";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.string().required().matches(phoneRegExp, {
    message: "Value must be a valid phone number",
  }),
  email: yup.string().required().email(),
  address: yup.string().required(),
});

const usePurchaseModal = (handleClose: () => void) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors: formErrors },
  } = useForm<BookPurchase>({
    resolver: yupResolver(schema),
  });

  const registers = registerInputs(register);

  const _handleClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = (formData: BookPurchase) => {
    _handleClose;
  };

  return {
    registers,
    onSubmit: handleSubmit(onSubmit),
    formErrors,
    _handleClose,
  };
};

const registerInputs = (register: UseFormRegister<BookPurchase>) => {
  const { ref: nameInputRef, ...nameInputProps } = register("name", {});

  const { ref: phoneNumberInputRef, ...phoneNumberInputProps } = register(
    "phoneNumber",
    {}
  );

  const { ref: emailInputRef, ...emailInputProps } = register("email", {});

  const { ref: addressInputRef, ...addressInputProps } = register(
    "address",
    {}
  );

  const registers = {
    name: {
      ref: nameInputRef,
      inputProps: nameInputProps,
    },
    phoneNumber: {
      ref: phoneNumberInputRef,
      inputProps: phoneNumberInputProps,
    },
    email: {
      ref: emailInputRef,
      inputProps: emailInputProps,
    },
    address: {
      ref: addressInputRef,
      inputProps: addressInputProps,
    },
  };

  return registers;
};

export default usePurchaseModal;
