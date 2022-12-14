import React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  isRequired?: boolean;
  register?: UseFormRegister<any>;
  error?: {
    message?: string;
  };
  inputProps?: InputProps;
  labelProps?: FormLabelProps;
  controlProps?: FormControlProps;
  errorMessageProps?: FormErrorMessageProps;
}

const TextInputControl: React.FC<Props> = ({
  name,
  label,
  isRequired = true,
  error,
  register,
  inputProps,
  labelProps,
  controlProps,
  errorMessageProps,
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error?.message} {...controlProps}>
      <FormLabel htmlFor={name} {...labelProps}>
        {label}
      </FormLabel>
      <Input id={name} name={name} {...inputProps} {...(register && register(name))} />
      <FormErrorMessage {...errorMessageProps}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInputControl;
