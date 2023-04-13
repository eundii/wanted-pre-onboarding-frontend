import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/baseUrl";

import axios from "axios";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

const initialErrorData = {
  userEmail: "",
  userPassword: "",
};

function PageSignin() {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errorData, setErrorData] = useState(initialErrorData);

  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/signin`, {
        email: inputs.userEmail,
        password: inputs.userPassword,
      })
      .then((response) => {
        localStorage.setItem("Token", response.data.access_token);
        console.log(response);
        if ((response.status = 200)) {
          return navigate("/todo");
        }
      })
      .catch(function (error) {
        if (error.response.data.statusCode === 404) {
          alert(error.response.data.message);
        } else if (error.response.data.statusCode === 401) {
          alert("틀린 비밀번호 입니다. 다시 입력해주세요.");
        }
      });
  };

  useEffect(() => {
    const isToken = localStorage.getItem("Token");
    if (isToken) {
      navigate("/todo", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (errorData.userEmail === true && errorData.userPassword === true) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [errorData]);

  return (
    <div className="center-area">
      <h2 className="title">로그인</h2>
      <div className="center-area-inner">
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
            testid="signin-button"
            text="로그인"
            disabled={btnDisabled}
            onClick={onLogin}
            size="large"
          />
        </form>
      </div>
    </div>
  );
}

export default PageSignin;
