import { InputAdornment, styled, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type CustomTextFieldProps = {
  initialValue?: string;
  endIcon?: {
    component: ReactNode;
    onClick?: (value: string) => void;
  };
} & TextFieldProps;

const CustomTextField = (props: CustomTextFieldProps) => {
  const { endIcon, initialValue, ...textFieldProps } = props;
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    initialValue && setInput(initialValue);
  }, [initialValue]);

  const handleEndIconClick = () => {
    if (input && endIcon && endIcon.onClick) {
      endIcon.onClick(input);
    }
  };

  let additionalTextFieldProps = { ...textFieldProps };
  if (endIcon) {
    additionalTextFieldProps = {
      ...textFieldProps,
      InputProps: {
        endAdornment: (
          <StyledInputAdornment onClick={handleEndIconClick} position="end">
            {endIcon.component}
          </StyledInputAdornment>
        ),
      },
    };
  }

  return (
    <StyledTextField
      value={input}
      onChange={(e) => setInput(e.target.value)}
      disabled={additionalTextFieldProps.disabled}
      {...additionalTextFieldProps}
    />
  );
};

type StyledProps = {
  disabled?: boolean;
};

const StyledTextField = styled(MuiTextField)<StyledProps>`
  opacity: ${(props) => (props.disabled ? 0.9 : 1)};
  & .MuiInputBase-root {
    background: rgba(34, 0, 35, 0.7);
  }
  & .MuiInputBase-input {
    padding: 0.8em 1em;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
  }
`;

const StyledInputAdornment = styled(InputAdornment)({
  cursor: "pointer",
});

export default CustomTextField;
