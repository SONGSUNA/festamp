import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from './SignUp.module.css';

const SignUp = () => {
    console.log("SignUp() Called!");

    const navigate = useNavigate();

    // Hook
    const [uName, setUName] = useState("");
    const [uId, setUId] = useState("");
    const [uPw, setUPw] = useState("");
    const [pwSame, setPwSame] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uBirth, setUBirth] = useState("");

    // 비밀번호 정규식
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    // handleer
    const userNameHandler = (e) => {
        console.log("userNameHandler() Called!");

        setUName(e.target.value);
    };

    const userIdHandler = (e) => {
        console.log("userIdHandler() Called!");

        setUId(e.target.value);
    };

    const userPwHandler = (e) => {
        console.log("userPassWord() Called!");

        setUPw(e.target.value);
    };

    const userPwSameHandler = (e) => {
        console.log("userPwSameHandler() Called!");

        setPwSame(e.target.value);
    };

    const userPhoneHandler = (e) => {
        console.log("userPhoneHandler() Called!");

        setUPhone(e.target.value);
    };

    const userEmailHandler = (e) => {
        console.log("userEmailHandler() Called!");

        setUEmail(e.target.value);
    };

    const userBirthHandler = (e) => {
        console.log("userBirthHandler() Called!");

        setUBirth(e.target.value);
    };

    // 중복확인 버튼
    const DuplicateTestBtnHandler = () => {
        console.log(uId);
        let memberDB = JSON.parse(localStorage.getItem("memberDB"));
        let memDbId = Object.keys(memberDB);
        console.log(memDbId.includes(uId));
        console.log(memDbId);

        if (uId !== "" && uId !== null) {
            if (memDbId.includes(uId)) {
                alert("이미 사용중인 아이디입니다.");
                setUId("");
            } else {
                alert("사용 가능한 아이디입니다.");
            }
        } else {
            alert("아이디를 입력하세요.");
        }
    };

    // 비밀번호 정규식
    const formatCheckBtnHandler = () => {
        console.log("formatCheckBtnHandler() Clicked !!");

        if (uPw.match(passwordRegEx) === null) {
            alert("올바른 비밀번호를 입력해주세요.");
        } else {
            alert("사용 가능한 비밀번호 입니다.");
        }
    };

    // 비밀번호 확인 버튼
    const pwSameBntHandler = () => {
        console.log("pwSameBntHandler() Clicked!");

        if (pwSame !== "") {
            if (uPw === pwSame) {
                alert("비밀번호 일치합니다:)");
            } else {
                alert("비밀번호가 일치하지 않습니다.");
                setPwSame("");
            }
        } else {
            alert("비밀번호를 입력하세요.");
            setPwSame("");
        }
    };

    // 회원가입 버튼
    const joinBtn = () => {
        console.log("joinBtn() Clicked!");

        let memberInStorage = localStorage.getItem("memberDB");

        if (
            uId !== "" &&
            uName !== "" &&
            uPw !== "" &&
            uPhone !== "" &&
            uEmail !== "" &&
            uBirth !== ""
        ) { if(uPw === pwSame){
            if (memberInStorage === null) {
                let newMemberDb = {
                    [uId]: {
                        name: uName,
                        pw: uPw,
                        phone: uPhone,
                        email: uEmail,
                        birth: uBirth,
                    },
                };

                let memberStr = JSON.stringify(newMemberDb);
                localStorage.setItem("memberDB", memberStr);
            } else {
                let memberDbObj = JSON.parse(memberInStorage);
                console.log("memberInStorage");

                memberDbObj[uId] = {
                    name: uName,
                    pw: uPw,
                    phone: uPhone,
                    email: uEmail,
                    birth: uBirth,
                };

                let memberStr = JSON.stringify(memberDbObj);
                localStorage.setItem("memberDB", memberStr);
            }

            alert("회원가입을 축하드립니다.");

            navigate("/SignIn");
        }else {
            alert('비밀번호를 확인해주세요.');
        }
        } else {
            alert("정보를 입력해주세요");
        }
    };

    return (
        <div>
            <form>
                <div>
                    <h3>회원가입</h3>
                    <div>
                        <label htmlFor="u_name">
                            <p>이름(닉네임) </p>
                        </label>
                        <input
                            type="text"
                            id="u_name"
                            name="u_name"
                            onChange={(e) => userNameHandler(e)}
                            placeholder="이름(닉네임)"
                        />
                        <br />
                        <label htmlFor="u_id">
                            <p>아이디</p>
                        </label>
                        <input
                            type="text"
                            id="u_id"
                            name="u_id"
                            value={uId}
                            onChange={(e) => userIdHandler(e)}
                            placeholder="아이디"
                        />{" "}
                        &nbsp;
                        <button type="button" name="same" onClick={DuplicateTestBtnHandler}>
                            {" "}
                            중복 확인
                        </button>
                        <br />
                        <label htmlFor="u_pw">
                            <p>비밀번호</p>{" "}
                        </label>
                        <input
                            type="password"
                            id="u_pw"
                            name="u_pw"
                            value={uPw}
                            onChange={(e) => userPwHandler(e)}
                            placeholder="비밀번호 "
                        />{" "}
                        &nbsp;
                        <button type="button" onClick={formatCheckBtnHandler}>
                            확인
                        </button>
                        <p>비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</p>
                        <label htmlFor="pw_same">
                            <p>비밀번호 확인</p>
                        </label>
                        <input
                            type="password"
                            id="pw_same"
                            name="pw_same"
                            value={pwSame}
                            onChange={(e) => userPwSameHandler(e)}
                            placeholder="비밀번호 확인"
                        />{" "}
                        &nbsp;
                        <button type="button" onClick={pwSameBntHandler}>
                            {" "}
                            비밀번호 확인
                        </button>
                        <br />
                        <label htmlFor="u_phone">
                            <p>연락처</p>
                        </label>
                        <input
                            type="text"
                            id="u_phone"
                            name="u_phone"
                            value={uPhone}
                            onChange={(e) => userPhoneHandler(e)}
                            placeholder="연락처"
                        />
                        <br />
                        <label htmlFor="u_email">
                            <p>이메일</p>
                        </label>
                        <input
                            type="text"
                            id="u_email"
                            name="u_email"
                            value={uEmail}
                            onChange={(e) => userEmailHandler(e)}
                            placeholder="E-mail"
                        />
                        <br />
                        <label htmlFor="u_birth">
                            <p>생년월일</p>
                        </label>
                        <input
                            type="date"
                            id="u_birth"
                            name="u_birth"
                            value={uBirth}
                            onChange={(e) => userBirthHandler(e)}
                            placeholder="생일"
                        />
                        <br />
                    </div>
                    <div>
                        <button type="button" onClick={joinBtn}>
                            회원가입
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
