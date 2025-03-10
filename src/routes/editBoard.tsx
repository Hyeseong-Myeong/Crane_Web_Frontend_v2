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
const Title = styled.input`
    align-self: flex-start;

    font-size: 24px;
    margin-top:40px;
    margin-bottom: 10px;
    width: 60vw;

    border:none;
    border-bottom: 1px solid #000;

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
    font-size: 16px;
    font-weight: 500;

    color: white;
    background-color: #0F62FE;
    border: none;
    padding: 10px 20px;


    cursor: pointer;
`


const Option = styled.option`
    
`



export default function EditBoard(){
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("")
    const [boardType, setBoardType] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    // const [attatchFile, setAttatchFile] = useState();
    const [editorContent, setEditorContent] = useState<string>("");
    const [isLoading, setIsLoading]  = useState(false);

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setBoardType(e.target.value)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBoardTitle(e.target.value);
    }

    const handlePublish = () => {
        if(isLoading){
            return
        }
        // 제목, 내용의 공백 체크
        if (!boardTitle.trim()) {
            alert("제목을 입력해 주세요.");
            return;
        }

        if (!editorContent.trim()) {
            alert("내용을 입력해 주세요.");
            return;
        }
        
        if(!boardType){
            alert("카테고리를 선택해주세요");
            return;
        }
        setIsLoading(true);
        
        const payload = {
            title : boardTitle,
            content : editorContent,
            boardCategory : boardType,
            // attatchFile : attatchFile
        }

        try{
            const token = localStorage.getItem('authorization');

            axios.post(
                `${import.meta.env.VITE_API_URL}/boards/write`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                },
            ).then(res => {
                if(res.status === 200){
                    navigate(`/board`);
                }
            })
        }catch(err){

        }
    };

    useEffect(()=> {
        const token = localStorage.getItem('authorization');

        try{
            axios.get(
                `${import.meta.env.VITE_API_URL}/users/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }      
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
            <Title 
                placeholder="게시글 제목" 
                onChange={onTitleChange}    
            />                
            <EditorContainer>
                <Select onChange={onSelectChange}>
                    <Option value={""}>카테고리 선택</Option>
                    <Option value={"FEED"}>자유 게시판</Option>
                    { (userRole === "ADMIN" || userRole === "MANAGER") && ( 
                        <>
                            <Option value={"NOTICE"}>공지사항</Option> 
                            <Option value={"EQUIPMENT"}>장비 게시판</Option> 
                            <Option value={"ADMIN"}>임원 게시판</Option> 
                            <Option value={"GALLERY"}>갤러리</Option>
                        </>
                    )}
                
                </Select>
                <QuillEditor setContent = {setEditorContent}/>
            </EditorContainer>
            <Publish onClick={handlePublish}>{isLoading ? "Loading...": "Submit"}</Publish>
        </Wrapper>
    )
}