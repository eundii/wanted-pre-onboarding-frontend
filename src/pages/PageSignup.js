import React, { useEffect, useState } from "react";

import styled from "styled-components";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

const initialErrorData = {
  userEmail: "",
  userPassword: "",
};

function PageSignup() {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errorData, setErrorData] = useState(initialErrorData);

  const onJoin = () => {};

  useEffect(() => {
    if (errorData.userEmail === true && errorData.userPassword === true) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [errorData]);

  return (
    <div className="center-area">
      <form>
        <FormInput
          testid="email-input"
          id="userEmail"
          name="userEmail"
          label="이메일"
          data={inputs}
          setData={setInputs}
          errorData={errorData}
          setErrorData={setErrorData}
          inputProps={{
            type: "text",
            placeholder: "E-mail을 입력하세요.",
          }}
        />
        <FormInput
          testid="password-input"
          id="userPassword"
          name="userPassword"
          label="비밀번호"
          data={inputs}
          setData={setInputs}
          errorData={errorData}
          setErrorData={setErrorData}
          inputProps={{
            type: "password",
            placeholder: "비밀번호를 입력하세요.",
          }}
        />

        <FormButton
          testid="signup-button"
          text="회원가입"
          disabled={btnDisabled}
          onClick={onJoin}
        />

        {/* <FormButton
          testid="signin-button"
          text="로그인"
          disabled={btnDisabled}
          onClick={onJoin}
        /> */}
      </form>
    </div>
  );
}

export default PageSignup;
