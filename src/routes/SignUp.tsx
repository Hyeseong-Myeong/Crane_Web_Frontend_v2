import { useState } from "react";
import { useNavigate } from "react-router-dom";
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


const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export default function SignUp(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
    
    const onSelectChange = (e) => {
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
        try{
            //계정 생성
            const response = await fetch("http://localhost:8080/api/users/signup",
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            console.log(data)
            if(response.status === 201){
                const loginResponse = await fetch("http://localhost:8080/api/auth/login",
                    {
                        method: "POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );
                const loginData = await loginResponse.json();
                console.log(loginData);

                if(loginResponse.status === 200){
                    const cookies = document.cookie;
                    console.log("로그인 성공");
                    console.log(cookies);
                }
                

            }else if(response.status === 400){
                alert(`회원가입 실패`);
            }
            //auto login
            
            //redirect to home
            navigate("/");
        }catch(e){

        }finally{

        }
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
                {error !== ""? <Error>{error}</Error> : null}
                </FormContainer>
            </LoginFormContainer>
        </Wrapper>
    )
}