import React from "react";

import styled from "styled-components";

const Btn = styled.button`
  display: inline-flex;
  height: 3rem;
  padding: 0 2rem;
  font-size: 1.8rem;
  color: white;
  background-color: #228be6;
  outline: none;
  border-radius: 0.4rem;
  border: 0;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
    cursor: default;
  }
`;

function FormButton({ testid, text, onClick, disabled }) {
  return (
    <Btn data-testid={testid} disabled={disabled} onClick={onClick}>
      {text}
    </Btn>
  );
}

export default FormButton;
