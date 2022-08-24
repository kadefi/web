import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { ReactNode } from "react";

type CustomTextFieldProps = {
  input: string;
  onInputChange: (value: string) => void;
  startIcon?: {
    component: ReactNode;
  };
  endIcon?: {
    component: ReactNode;
    onClick?: (value: string) => void;
  };
} & TextFieldProps;

const TextField = (props: CustomTextFieldProps) => {
  const { input, onInputChange, startIcon, endIcon, ...textFieldProps } = props;

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
      onChange={(e) => onInputChange(e.target.value)}
      disabled={additionalTextFieldProps.disabled}
      hasStartIcon={Boolean(startIcon)}
      {...additionalTextFieldProps}
    />
  );
};

type StyledProps = {
  disabled?: boolean;
  hasStartIcon?: boolean;
};

const StyledTextField = styled(MuiTextField)<StyledProps>`
  opacity: ${(props) => (props.disabled ? 0.9 : 1)};
  & .MuiInputBase-root {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10rem;
  }
  & .MuiInputBase-input {
    padding: ${(props) => (props.hasStartIcon ? "0.5rem 0.25rem" : "0.5rem 1rem")};
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

export default TextField;
