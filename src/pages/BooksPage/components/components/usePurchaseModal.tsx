import { UseFormRegister, useForm } from "react-hook-form";

const usePurchaseModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm<BookPurchase>();

  const registers = registerInputs(register);

  const onSubmit = (formData: BookPurchase) => {
    console.log("purchase was made: ", formData);
  };

  return { registers, onSubmit: handleSubmit(onSubmit), formErrors };
};

const registerInputs = (register: UseFormRegister<BookPurchase>) => {
  const { ref: nameInputRef, ...nameInputProps } = register("name", {
    required: "This field is required",
  });

  const { ref: phoneNumberInputRef, ...phoneNumberInputProps } = register(
    "phoneNumber",
    {
      required: "This field is required",
    }
  );

  const { ref: emailInputRef, ...emailInputProps } = register("email", {
    required: "This field is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  });

  const { ref: addressInputRef, ...addressInputProps } = register("address", {
    required: "This field is required",
  });

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
