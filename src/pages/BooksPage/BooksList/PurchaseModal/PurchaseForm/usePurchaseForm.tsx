import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  name: yup.string().required("Name is a required field"),
  phoneNumber: yup
    .string()
    .required("Phone number is a required field")
    .matches(phoneRegExp, {
      message: "Value must be a valid phone number",
    }),
  email: yup.string().required("Email is a required field").email(),
  address: yup.string().required("Address is a required field"),
});

interface usePurchaseModalProps {
  handleClose: () => void;
  bookName: string;
  shouldReset: boolean;
  setPurchasedBook: (bookName: string) => void;
}

const usePurchaseForm = ({
  bookName,
  shouldReset,
  handleClose,
  setPurchasedBook,
}: usePurchaseModalProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors: formErrors },
  } = useForm<BookPurchase>({
    resolver: yupResolver(schema),
  });
  const registers = registerInputs(register);

  React.useEffect(() => {
    reset();
  }, [shouldReset]);

  const onSubmit = () => {
    setPurchasedBook(bookName);
    handleClose();
  };

  return {
    registers,
    onSubmit: handleSubmit(onSubmit),
    formErrors,
  };
};

const registerInputs = (register: UseFormRegister<BookPurchase>) => {
  const { ref: nameInputRef, ...nameInputProps } = register("name");

  const { ref: phoneNumberInputRef, ...phoneNumberInputProps } =
    register("phoneNumber");

  const { ref: emailInputRef, ...emailInputProps } = register("email");

  const { ref: addressInputRef, ...addressInputProps } = register("address");

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

export default usePurchaseForm;
