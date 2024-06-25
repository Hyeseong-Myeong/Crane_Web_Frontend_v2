import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie"
import styled from "styled-components"

const Wrapper = styled.div`
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
`;

const ImageContainer = styled.div`
    padding: 0px;
    
    width: 50vw;
    height: 100vh;
    object-fit: cover;
`;

const Image = styled.img`
    width: 100%;
    height:100%;
    object-fit:cover;
`

const LoginFormContainer = styled.div`
    width: 50vw;
    
    display:flex;
    flex-direction: column;
    
    padding: 80px;

    justify-content:center;
`;
const FormContainer = styled.div`
    width: 100%
`;

const Title = styled.h1`
    font-size: 42px;
    font-weight: 600;
`;

const InputTitle = styled.span`
    padding:16px;
    font-size: 20px;
    font-weight: 600;
`;

const Form = styled.form`
    margin-top: 50px;
    display:flex;
    flex-direction:column;
    
`;

const Input = styled.input`
    padding: 10px 20px;
    border: none;
    width: 70%;
    font-size: 16px;
    background-color:#F2F4F8;
    &[type="submit"] {
        cursor:pointer;
        margin-top: 10px;
        
        &:hover{
            background-color: #0F62FE;
        }
    }
`;

const SignInError = styled.span`
    font-weight: 600;
    color: tomato;
`;



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
            </LoginFormContainer>
        </Wrapper>
    )
}