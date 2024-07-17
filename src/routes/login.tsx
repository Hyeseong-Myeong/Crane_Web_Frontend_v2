import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormContainer, Image, ImageContainer, Input, InputTitle, LoginFormContainer, SignInError, Switcher, Title, Wrapper } from "../components/auth-components";



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
            userEmail : email,
            userPassword : password
        }
        
        setIsLoading(true);


        //로그인
        await fetch("http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(payload),
            }
        ).then(res => {
            if(!res.ok){
                console.log(res);
            }
            return res.json();
        })
        .then(data => {
            if(data.code === 200){
                navigate("/");
            }
            else if(data.code === 400){
                setIsLoading(false);
                setSignInError("아이디 또는 비밀번호가 잘못되었습니다.");
                throw new Error("입력 오류");
            }
            else{
                setIsLoading(true);
                setSignInError("로그인 오류. 새로고침 후 다시 시도해주세요.")
                throw new Error("로그인 실패")
            }
        })
        .catch(e => {
            console.log(e);
        })
            
    }

    return(
        <Wrapper>
            <ImageContainer >
                <Image src="public/login-img.jpg" />
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
                    이미 계정이 있는 경우 <Link to="/signUp">로그인</Link>
                </Switcher>
            </LoginFormContainer>
        </Wrapper>
    )
}