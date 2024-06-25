import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Select = styled.select`
    padding: 10px 20px;
    border: none;
    width: 70%;
    font-size: 16px;
    background-color:#F2F4F8;
`;

const Option = styled.option`
    padding: 10px 20px;
    border: none;
    width: 70%;
    font-size: 16px;
    background-color:#F2F4F8;
`;

const SignInError = styled.span`
    font-weight: 600;
    color: tomato;
`;

const Switcher = styled.span`
    margin-top: 20px;
`

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
        //계정 생성
        await fetch("http://localhost:8080/api/users/signup",
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
            else if(data.code === 409){
                setIsLoading(false);
                setSignInError("이미 사용중인 이메일입니다.");
                throw new Error("이메일 중복");
            }
            else{
                setIsLoading(true);
                setSignInError("회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요.")
                throw new Error("회원가입에 실패했습니다.")
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