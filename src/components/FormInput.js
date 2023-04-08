import React from "react";

const ID_REGEX = /^[\w\W]+@[\w\W]+$/;
const PW_REGEX = /^[\w\W]{8,}$/;

const ERROR_MSG = {
  required: "필수 정보입니다.",
  invalidId: "올바른 이메일 주소를 입력해주세요.(@포함)",
  invalidPw: "8자 이상 입력해주세요.",
};

function FormInput({
  id,
  testid,
  label,
  data,
  setData,
  errorData,
  setErrorData,
  inputProps,
}) {
  const checkValidate = (inputId) => {
    let result;
    const value = data[inputId];
    switch (inputId) {
      case "userEmail":
        result = ID_REGEX.test(value) ? true : "invalidId";
        break;
      case "userPassword":
        result = PW_REGEX.test(value) ? true : "invalidPw";
        break;
      default:
        return;
    }
    setErrorData((prev) => ({ ...prev, [inputId]: result }));
  };

  return (
    <div className="form-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={data[id]}
        data-testid={testid}
        {...inputProps}
        onChange={(e) => setData((prev) => ({ ...prev, [id]: e.target.value }))}
        onBlur={() => checkValidate(id)}
      />
      <div className="validate-text">
        {errorData[id] !== true ? ERROR_MSG[errorData[id]] : ""}
      </div>
    </div>
  );
}

export default FormInput;
