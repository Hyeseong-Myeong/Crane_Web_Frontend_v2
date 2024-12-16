import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormContainer, Image, ImageContainer, Input, InputTitle, LoginFormContainer, SignInError, Switcher, Title, Wrapper } from "../components/auth-page-components";
import axios from "axios";


export default function Login(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }


    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading || 
            email === "" || 
            password === ""){
            return;
        }
        //create payload
        const payload = {
            email : email,
            password : password
        }
        
        setIsLoading(true);


        //로그인
        try{ 
            axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                payload,
                {
                    withCredentials: true,
                }
            ).then(res =>{
                if(res.status === 200){
                    // JWT 추출 (헤더에서 Authorization 가져오기) 및 저장
                    const authHeader = res.headers['authorization']; // 응답 헤더에서 JWT 추출
                    if (authHeader) {
                        const token = authHeader.split(' ')[1]; // "Bearer" 제거
                        localStorage.setItem('authorization', token); // Local Storage에 저장
                    }
                    
                    navigate("/")
                } else if(res.data.code === 400){
                    setIsLoading(false);
                    setSignInError("아이디 또는 비밀번호가 잘못되었습니다.");
                    throw new Error("입력 오류");
                }else{
                    setIsLoading(true);
                    setSignInError("로그인 오류. 새로고침 후 다시 시도해 주세요.");
                    throw new Error("로그인 오류")
                }
            })
        } catch(error){
            console.log(error);
        }            
    }

    return(
        <Wrapper>
            <ImageContainer >
                <Image src="login-img.jpg" />
            </ImageContainer>
            <LoginFormContainer>
                <Title>Log In</Title>
                <FormContainer>
                <Form onSubmit={onSubmit}>
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
                
                    <Input 
                        type="submit"
                        value={isLoading ? "Loading..." : "로그인"}
                    />

                </Form>
                {signInError !== ""? <SignInError>{signInError}</SignInError> : null}
                </FormContainer>
                <Switcher>
                    계정이 없으신가요? <Link to="/signUp">회원가입</Link>
                </Switcher>
            </LoginFormContainer>
        </Wrapper>
    )
}