import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GalleryPost } from "./gallery";
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";

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

export default function GalleryDetail(){
    const { boardId } = useParams();
    const [galleryItems, setGalleryItems] = useState<GalleryPost>();
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        const fetchGallery = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/board/${boardId}`,
                {
                    withCredentials: true,
                }
            );
            setGalleryItems(res.data);

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
        fetchGallery();
    }, []);

    return (
        <Wrapper>
            <HomeENGTitle>GALLERY</HomeENGTitle>
            <HomeKRTitle>갤러리</HomeKRTitle>
            <DetailTitle> {galleryItems?.boardTitle}</DetailTitle>
            <DetailAuthContainer>
                {galleryItems?.userPic ? <DetailAuthorPic src={galleryItems.userPic} />
                                        : <DetailAuthorPic src="public/cool_profile_pic.webp" />}
                <DetailAuthor href={`/profile/${galleryItems?.userId}`}>작성자: {galleryItems?.userName} </DetailAuthor>
                <DetailAuthDate>작성일시: {formattedDate}</DetailAuthDate>
                <DetailView> 조회수: {galleryItems?.boardView}</DetailView>
            </DetailAuthContainer>
            <ContentsContainer>
                {galleryItems?.boardContents}
            </ContentsContainer>
        </Wrapper>
    );
}