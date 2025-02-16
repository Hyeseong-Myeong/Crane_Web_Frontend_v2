import styled from "styled-components";
import { BoardPost } from "../routes/gallery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";


const Wrapper = styled.div`
    font-family: "Noto Sans KR";

    outline: solid 1px #DDE1E6;
    margin: 10px;
`;

const GalleryContainer = styled.div`
    width: 308px;
    height: 424px;

    &:hover{

    }
`;

const GalleryImg = styled.img`
    max-width: 308px;
    max-height: 220px;
    overflow: hidden;
`;

const GalleryTitleContainer = styled.div`
`;


const Title = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #21272A;

    margin: 10px;
    padding-top: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #21272A;

    margin: 10px;
`

const AuthorContainer = styled.div`
    display: flex;
    align-items: center;

    margin-top: 40px;
`;

const AuthorPic = styled.img`
    height: 48px;
    width: 48px;

    border-radius: 50%;
    margin: 10px;
`;

const AuthorName = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #21272A;

    margin: 10px;

    text-decoration:none;

    &:hover{
        text-decoration: underline;
    }
`;

const AuthorDesc = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #21272A;

    margin: 10px;
`

const CreatedAt = styled.div`
    text-decoration: none;
    color: grey;

    text-align: right;
    padding: 10px;
`;

export function TruncatedText(fullText: string, maxLen: number){
    if (fullText.length > maxLen) {
        return fullText.slice(0, maxLen) + "...";
      }
      return fullText;
}

export default function GalleryItem({boardId, title, createdAt, content, writer, boardCategory, view, thumbNaile}:BoardPost ){
    const [userPic, setUserPic] = useState("cool_profile_pic.webp")
    const [formattedDate, setFormattedDate] = useState("");

    const sanitizer = (content: string) => {
        return DOMPurify.sanitize(content, {
            ALLOWED_TAGS: [],  // 허용할 태그 목록
            ALLOWED_ATTR: [],  // class 속성을 허용
        });
    };

    useEffect(() => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // if(userResponseDto.userPic != null){
        //     setUserPic(userResponseDto.userPic);
        // }
        setFormattedDate(`${year}년 ${month}월 ${day}일 ${hours}:${minutes}`);
    }, [createdAt]);


    return(
        <Wrapper>
            <Link to={`/gallery/detail/${boardId}`}  style={{ textDecoration: 'none' }}>
                <GalleryContainer>
                    { thumbNaile ? <GalleryImg src={thumbNaile} /> : <GalleryImg src="home_main.jpg" /> }

                    <GalleryTitleContainer>
                        {/* <Id>{bid}</Id> */}
                        <Title>{title}</Title>
                        <Description>{TruncatedText(sanitizer(content), 40)}</Description>
                        <AuthorContainer>
                            <AuthorPic src={userPic} />
                            <div>
                                {/* <Link to={`profile/${userResponseDto.uid}`} style={{ textDecoration: 'none' }}>  */}
                                    <AuthorName>
                                        {writer} 
                                    </AuthorName>
                                {/* </Link> */}
                                <AuthorDesc>기 </AuthorDesc>
                            </div>
                        </AuthorContainer>
                        <CreatedAt>{formattedDate}</CreatedAt>
                    </GalleryTitleContainer>
                </GalleryContainer>
            </Link>
        </Wrapper>
    )
}