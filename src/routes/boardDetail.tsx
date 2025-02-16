import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardPost } from "./gallery";
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from "dompurify";
import QuillEditor from "../components/quillEditor";
import { formatDateString } from "./board";

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

    border-bottom: 1px solid #eee;
`
const TitleInput = styled.input`
    font-size: 24px;
    font-weight: 500;

    text-align: left;
    width: 70vw;

    padding: 10px;
    border: 1px solid #ddd;
`;

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

const Button = styled.button`
    margin-left: auto; 
    padding: 10px 20px;
    background-color: #001D6C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`

export default function BoardDetail(){
    const token = localStorage.getItem('authorization');

    const { boardId } = useParams();
    const [boardItems, setBoardItems] = useState<BoardPost>();
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [authorEmail, setAuthorEmail] = useState<string>("")
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedContent, setUpdatedContent] = useState<string>("");
    const [updatedTitle, setUpdatedTitle] = useState<string>("");

    const sanitizer = (content: string) => {
        return DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ['span', 'p', 'strong', 'em', 'ul', 'ol', 'li','u', 's'],  // 허용할 태그 목록
            ALLOWED_ATTR: ['class'],  // class 속성을 허용
        });
    };


    useEffect(() => {
        const fetchBoard = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/boards/${boardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    } 
                }
            ).then(res => {
                console.log(res)
                setBoardItems(res.data.data);
                setUpdatedTitle(res.data.data.boardTitle);
                setFormattedDate(formatDateString(res.data.data.createdAt.toString()));
            })
        };

        const getUser = async() => {
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
                        setUserEmail(res.data.data.email)
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

    useEffect(() => {
        if (boardItems && isEditing) {
            setUpdatedContent(boardItems.content || "");
        }
    }, [isEditing, boardItems]);

    const handleSave = async () => {
        const token = localStorage.getItem('authorization');

        const payload = {
            boardTitle: updatedTitle,
            boardContents: updatedContent,
            boardCategory: boardItems?.boardCategory,
        };

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/board/updateBoard/${boardId}`,
                payload,
                { 
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }                 
                }
            );

            if (res.status === 200) {
                setBoardItems((prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            boardTitle: updatedTitle, 
                            boardContents: updatedContent,
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
            {isEditing ? (
                <TitleInput 
                    value={updatedTitle} 
                    onChange={(e) => setUpdatedTitle(e.target.value)} 
                />
            ) : (
                <DetailTitle>{boardItems?.title}</DetailTitle>
            )}
            <DetailAuthContainer>
                {/* {boardItems?.userResponseDto.userPic ? <DetailAuthorPic src={boardItems.userResponseDto.userPic} />
                                        : <DetailAuthorPic src="public/cool_profile_pic.webp" />} */}
                <DetailAuthor>작성자: {boardItems?.writer} </DetailAuthor>
                <DetailAuthDate>작성일시: {formattedDate}</DetailAuthDate>
                <DetailView>조회수: {boardItems?.view}</DetailView>
                {userEmail === authorEmail && !isEditing &&
                    <Button onClick={() => setIsEditing(true)}>수정</Button>
                }
                {isEditing &&
                    <Button onClick={handleSave}>저장</Button>
                }
            </DetailAuthContainer>
            <ContentsContainer className="ql-editor">
                {isEditing ? (
                    <QuillEditor setContent={setUpdatedContent} initialValue={boardItems?.content}/> 
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: sanitizer(`${boardItems?.content}`) }} />
                )}
            </ContentsContainer>
        </Wrapper>
    );
}