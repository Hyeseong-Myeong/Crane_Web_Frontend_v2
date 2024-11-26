import styled from "styled-components";
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { GalleryContainer, BoardPost } from "./gallery";
import GalleryItem from "../components/gallery-item";
import { Link } from "react-router-dom";


const Wrapper = styled.div`
    display:flex;
    flex-direction: column;

    font-family: "Noto Sans KR";
`


const PhotoContainer = styled.div`
    
    left:0px;

    width: 100vw;
    height: 50vh;
    
`;

// const Slide = styled.div`

// `;

// const Show = styled.div`
    
// `;

const Photo = styled.img`
    width: 100vw;
    height: 50vh;
    
    object-fit: cover;
`;

const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;

    margin: 20px;
    padding: 20px;

    margin-left: 15vw;
    margin-right: 15vw;
    
`;
const HomeLink = styled.button`
    font-size: 16px;
    font-weight: 500;

    color: white;
    background-color: #0F62FE;
    border: none;
    padding: 10px 20px;


    cursor: pointer;
`


export default function Home(){
    const[noticeItems, setNoticeItems] = useState<BoardPost[]>([]);
    const[galleryItems, setGalleryItems] = useState<BoardPost[]>([]);


    useEffect(() => {
        const fetchNotice = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/board/list`,
                {params:{
                    "category": "NOTICE",
                    "page" : 0
                }}
            ).then(res => {
                setNoticeItems(res.data.contents);
            })
            
        }
        const fetchGallery = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/board/list`,
                {params:{
                    "category": "GALLERY",
                    "page" : 0
                }}
            ).then(res => {
                setGalleryItems(res.data.contents);
            })
            
        }

        fetchNotice();
        fetchGallery();
    }, [])

    return (
        <Wrapper>
            <PhotoContainer>
                <Photo src="home_main.jpg" />
            </PhotoContainer>
            <HomeContainer>
                <HomeENGTitle>NOTICE</HomeENGTitle>
                <HomeKRTitle>공지사항</HomeKRTitle>
                <GalleryContainer>
                    {noticeItems.slice(0,4).map((item) => (
                        <GalleryItem key={item.bid}{...item} />
                    ))}
                </GalleryContainer>
                <Link to={"/board"}> <HomeLink> 더보기 </HomeLink> </Link>
                <HomeENGTitle>GALLERY</HomeENGTitle>
                <HomeKRTitle>갤러리</HomeKRTitle>
                <GalleryContainer>
                    {galleryItems.slice(0,4).map((item) => (
                        <GalleryItem key={item.bid}{...item} />
                    ))}
                </GalleryContainer>
                <Link to={"/gallery"}> <HomeLink> 더보기 </HomeLink> </Link>
            </HomeContainer>
        </Wrapper>
    );
}