import styled from "styled-components";

export const Wrapper = styled.div`
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
`;

export const ImageContainer = styled.div`
    padding: 0px;
    
    width: 50vw;
    height: 100vh;
    object-fit: cover;
`;

export const Image = styled.img`
    width: 100%;
    height:100%;
    object-fit:cover;
`

export const LoginFormContainer = styled.div`
    width: 50vw;
    
    display:flex;
    flex-direction: column;
    
    padding: 80px;
    padding-top: 10px;
    padding-bottom:5px;
    justify-content:center;
`;
export const FormContainer = styled.div`
    width: 100%
`;

export const Title = styled.h1`
    font-size: 42px;
    font-weight: 600;
`;



export const InputTitle = styled.span`
    padding:16px;
    font-size: 20px;
    font-weight: 600;
`;

export const Form = styled.form`
    margin-top: 50px;
    display:flex;
    flex-direction:column;
    
`;

export const Input = styled.input`
    padding: 10px 20px;
    width: 70%;
    font-size: 16px;
    background-color: #F2F4F8;
    
    border-width:0 0 1px;
    border-color: #C1C7CD;

    &[type="submit"] {
        cursor:pointer;
        margin-top: 10px;
        
        &:hover{
            background-color: #0F62FE;
        }
    }
`;

export const Select = styled.select`
    padding: 10px 20px;
    border: none;
    width: 70%;
    font-size: 16px;
    background-color:#F2F4F8;
`;

export const Option = styled.option`
    padding: 10px 20px;
    border: none;
    width: 70%;
    font-size: 16px;
    background-color:#F2F4F8;
`;

export const SignInError = styled.span`
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
`