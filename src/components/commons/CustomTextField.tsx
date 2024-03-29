import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { ReactNode, useEffect, useState } from "react";

type CustomTextFieldProps = {
  initialValue?: string;
  startIcon?: {
    component: ReactNode;
  };
  endIcon?: {
    component: ReactNode;
    onClick?: (value: string) => void;
  };
} & TextFieldProps;

const CustomTextField = (props: CustomTextFieldProps) => {
  const { startIcon, endIcon, initialValue, ...textFieldProps } = props;
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
  additionalTextFieldProps = {
    ...textFieldProps,
    InputProps: {
      ...(startIcon && {
        startAdornment: <InputAdornment position="start">{startIcon.component}</InputAdornment>,
      }),
      ...(endIcon && {
        endAdornment: (
          <StyledInputAdornment onClick={handleEndIconClick} position="end">
            {endIcon.component}
          </StyledInputAdornment>
        ),
      }),
    },
  };

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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10rem;
  }
  & .MuiInputBase-input {
    padding: 0.5rem 0.25rem;
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
