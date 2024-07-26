import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormContainer, Image, ImageContainer, Input, InputTitle, LoginFormContainer, Option, Select, SignInError, Switcher, Title, Wrapper } from "../components/auth-page-components";
import axios from "axios";



export default function SignUp(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentId, setStudentId] = useState("");
    const [dept, setDept] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [session, setSession] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name === "studentId"){
            setStudentId(value)
        }else if(name === "dept"){
            setDept(value);
        }else if(name === "phoneNumber"){
            setPhoneNumber(value);
        }else if(name === "birthday"){
            setBirthday(value);
        }else if(name === "session"){
            setSession(value);
        }
    }
    
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSession(e.target.value)
    }

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading || 
            name === "" || 
            email === "" || 
            password === "" || 
            studentId === "" || 
            dept==="" || 
            phoneNumber === "" || 
            birthday === "" ||  
            session === ""){
                console.log(name, email, password, studentId, dept, phoneNumber, birthday, session)
            return;
        }
        //create payload
        const payload = {
            userEmail : email,
            userPassword : password,
            userName: name,
            userDept: dept,
            userStdId: studentId,
            userPhNum:  phoneNumber,
            userBirth: birthday,
            userSession :session
        }
        
        setIsLoading(true);
        console.log("실행");
        //계정 생성
        try{
            axios.post(
                `${import.meta.env.VITE_API_URL}/users/signup`,
                payload,
            )
            .then(res => {
                if(res.status === 200){
                    navigate("/")
                }else if(res.status === 409){
                    setIsLoading(false);
                    setSignInError("이미 사용중인 이메일입니다.");
                    throw new Error("이메일 중복");
                }else {
                    setIsLoading(true);
                    setSignInError("회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요.")
                    throw new Error("회원가입에 실패했습니다.")
                }
            })
        }catch(err){
            console.log(err);
        }

        // await fetch("http://localhost:8080/api/users/signup",
        //     {
        //         method: "POST",
        //         headers:{
        //             "Content-Type":"application/json",
        //         },
        //         body: JSON.stringify(payload),
        //     }
        // ).then(res => {
        //     if(!res.ok){
        //         console.log(res);
        //     }
        //     return res.json();
        // })
        // .then(data => {
        //     if(data.code === 200){
        //         navigate("/");
        //     }
        //     else if(data.code === 409){
        //         setIsLoading(false);
        //         setSignInError("이미 사용중인 이메일입니다.");
        //         throw new Error("이메일 중복");
        //     }
        //     else{
        //         setIsLoading(true);
        //         setSignInError("회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요.")
        //         throw new Error("회원가입에 실패했습니다.")
        //     }
        // })
        // .catch(e => {
        //     console.log(e);
        // })
            
    }

    return(
        <Wrapper>
            <ImageContainer >
                <Image src="public/login-img.jpg" />
            </ImageContainer>
            <LoginFormContainer>
                <Title>Sign Up</Title>
                <FormContainer>
                <Form onSubmit={onSubmit}>
                    <InputTitle>이름</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="name" 
                        value={name}
                        placeholder="이름" 
                        type="text" 
                        required
                    />
                    <InputTitle>Email</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="email"
                        value={email}
                        placeholder="순천향 이메일" 
                        type="email" 
                        required
                    />
                    <InputTitle>Password</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="password"
                        value={password}
                        placeholder="비밀번호"
                        type="password"
                        required
                    />
                    <InputTitle>학번</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="studentId"
                        value={studentId}
                        placeholder="학번"
                        type="text"
                        required
                    />
                    <InputTitle>학과</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="dept"
                        value={dept}
                        placeholder="학과"
                        type="text"
                        required
                    />
                    <InputTitle>전화번호</InputTitle>
                    <Input
                        onChange={onChange} 
                        name="phoneNumber"
                        value={phoneNumber}
                        placeholder="전화번호"
                        type="text"
                        required
                    />
                    <InputTitle>세션</InputTitle>
                    <Select onChange={onSelectChange} required>
                        <Option value="">세션 선택</Option>
                        <Option value="VOCAL">보컬</Option>
                        <Option value="GUITAR">기타</Option>
                        <Option value="BASS">베이스</Option>
                        <Option value="DRUM">드럼</Option> 
                        <Option value="KEYBOARD">키보드</Option>
                    </Select>
                    <InputTitle>생년월일</InputTitle>
                    <Input 
                        onChange={onChange}
                        name="birthday"
                        value={birthday}
                        type="date"
                        required
                    />
                    <Input 
                        type="submit"
                        value={isLoading ? "Loading..." : "계정 만들기"}
                    />
                </Form>
                {signInError !== ""? <SignInError>{signInError}</SignInError> : null}
                </FormContainer>
                <Switcher >
                    이미 계정이 있는 경우 <Link to="/login">로그인</Link>
                </Switcher>
                </LoginFormContainer>
        </Wrapper>
    )
}