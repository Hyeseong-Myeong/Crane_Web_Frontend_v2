import styled from "styled-components"
import QuillEditor from "../components/quillEditor"
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Wrapper = styled.div`
    display: flex;
    flex-direction:column;

    margin-left: 15vw;
    margin-right: 15vw;

    align-items: center;
    font-family: "Noto Sans KR";
`
const Title = styled.span`
    align-self: flex-start;

    font-size: 24px;
    margin-top:10px;
    margin-bottom: 10px;

`


const EditorContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 60px;

    align-self: flex-end;
`

const Select = styled.select`
    margin-bottom: 10px;
`

const Publish = styled.button`
    
`


const Option = styled.option`
    
`



export default function EditBoard(){
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("")
    const [boardType, setBoardType] = useState("FREE");
    const [editorContent, setEditorContent] = useState<string>("");

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setBoardType(e.target.value)
    }

    const handlePublish = () => {
        console.log("게시글 내용:", editorContent);
    };

    useEffect(()=> {
        try{
            axios.get(
                `${import.meta.env.VITE_API_URL}/users/userinfo`,
                {
                    withCredentials: true
                },
            )
            .then(res => {
                if(res.status === 200){
                    setUserRole(res.data.data.userRole)

                }else if(res.status === 401){
                    
                }else {
                    
                }
            })
        }catch(err){
            console.log("인증 에러")
        }
    },[])

    return(
        <Wrapper>
            <Title>
                새 글 작성
            </Title>
            <EditorContainer>
                <Select onChange={onSelectChange}>
                    <Option value={""}>카테고리 선택</Option>
                    <Option value={"FREE"}>자유 게시판</Option>
                    { (userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER") && ( 
                        <>
                            <Option value={"NOTICE"}>공지사항</Option> 
                            <Option value={"INSTRUMENT"}>장비 게시판</Option> 
                            <Option value={"ADMIN"}>임원 게시판</Option> 
                        </>
                    )}
                
                </Select>
                <QuillEditor setContent = {setEditorContent}/>
            </EditorContainer>
            <Publish onClick={handlePublish}>등록</Publish>
        </Wrapper>
    )
}