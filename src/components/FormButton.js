import React from "react";

function FormButton({ testid, text, onClick, disabled, size }) {
  return (
    <button
      className={["btn", size].join(" ")}
      data-testid={testid}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

FormButton.defaultProps = {
  size: "medium",
};

export default FormButton;
