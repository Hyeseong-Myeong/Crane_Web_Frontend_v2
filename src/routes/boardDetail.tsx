import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardPost } from "./gallery";
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from "dompurify";
import QuillEditor from "../components/quillEditor";

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;

    margin-left: 15vw;
    margin-right: 15vw;

    font-family: "Noto Sans KR";
`;

const DetailTitle = styled.div`
    font-size: 24px;
    font-weight: 500;

    text-align: left;
    width: 70vw;

    padding: 10px;

    border-bottom: 1px solid #eee
`
const DetailAuthContainer = styled.div`
    display: flex;
    align-items: center;

    text-align: left;
    width: 70vw;

    padding: 0px 10px 0px 10px;

    border-bottom: 2px solid #888888;
`

const DetailAuthorPic = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`

const DetailAuthor = styled.a`
    padding: 20px;

    text-decoration:none;
    color: black;
`

const DetailAuthDate = styled.div`
    padding: 20px;
`

const DetailView = styled.div`
    padding: 20px;
`

const ContentsContainer = styled.div`
    margin: 20px;

    text-align: left;
    width: 70vw;

`

const EditButton = styled.button`
    
`

const SaveButton = styled.button`
    padding: 10px;
    margin-left: 10px;
`;

export default function BoardDetail(){
    const { boardId } = useParams();
    const [boardItems, setBoardItems] = useState<BoardPost>();
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [authorEmail, setAuthorEmail] = useState<string>("")
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedContent, setUpdatedContent] = useState<string>("");
    const navigate = useNavigate();

    const sanitizer = (content: string) => {
        return DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ['span', 'p', 'strong', 'em', 'ul', 'ol', 'li','u', ],  // 허용할 태그 목록
            ALLOWED_ATTR: ['class'],  // class 속성을 허용
        });
    };


    useEffect(() => {
        const fetchBoard = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/board/${boardId}`,
                {
                    withCredentials: true,
                }
            );
            setBoardItems(res.data);
            setAuthorEmail(res.data.userResponseDto.userEmail);

            if (res.data.createdDate) {
                const date = new Date(res.data.createdDate);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();

                setFormattedDate(`${year}년${month}월${day}일 ${hours}:${minutes}`);
            }
        };
        const getUser = async() => {
            try{
                axios.get(
                    `${import.meta.env.VITE_API_URL}/users/userinfo`,
                    {
                        withCredentials: true
                    },
                )
                .then(res => {
                    if(res.status === 200){
                        setUserEmail(res.data.data.userEmail)
                    }else if(res.status === 401){
                        
                    }else {
                        
                    }
                })
            }catch(err){
                console.log("인증 에러")
            }
        }
       
        fetchBoard();
        getUser();
    }, []);

    const handleSave = async () => {
        const payload = {
            boardTitle: boardItems?.boardTitle,
            boardContents: updatedContent,
            boardCategory: boardItems?.boardCategory,
        };

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/board/updateBoard/${boardId}`,
                payload,
                { withCredentials: true }
            );

            if (res.status === 200) {
                setBoardItems((prev) => {
                    if (prev) {
                        return {
                            ...prev,  // 기존 상태 유지
                            boardContents: updatedContent, // 수정된 내용을 상태에 반영
                        };
                    }
                    return prev;  // prev가 undefined인 경우 그대로 반환
                });
            setIsEditing(false); // 수정 모드 해제
        }
        } catch (err) {
            console.error("게시글 수정 실패", err);
        }
    };

    return (
        <Wrapper>
            <HomeENGTitle>{boardItems?.boardCategory}</HomeENGTitle>
            <HomeKRTitle>{boardItems?.boardCategory == "GALLERY" ? "갤러리" : "게시판"}</HomeKRTitle>
            <DetailTitle>{boardItems?.boardTitle}</DetailTitle>
            <DetailAuthContainer>
                {boardItems?.userResponseDto.userPic ? <DetailAuthorPic src={boardItems.userResponseDto.userPic} />
                                        : <DetailAuthorPic src="public/cool_profile_pic.webp" />}
                <DetailAuthor href={`/profile/${boardItems?.userResponseDto.uid}`}>작성자: {boardItems?.userResponseDto.userName} </DetailAuthor>
                <DetailAuthDate>작성일시: {formattedDate}</DetailAuthDate>
                <DetailView>조회수: {boardItems?.boardView}</DetailView>
                {userEmail === authorEmail && !isEditing &&
                    <EditButton onClick={() => setIsEditing(true)}>수정하기</EditButton>
                }
                {isEditing &&
                    <SaveButton onClick={handleSave}>저장하기</SaveButton>
                }
            </DetailAuthContainer>
            <ContentsContainer className="ql-editor">
                {isEditing ? (
                    <QuillEditor setContent={setUpdatedContent} initialValue={boardItems?.boardContents}/> 
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: sanitizer(`${boardItems?.boardContents}`) }} />
                )}
            </ContentsContainer>
        </Wrapper>
    );
}