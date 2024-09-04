import styled from "styled-components"
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryItem from "../components/gallery-item";
import { useParams } from "react-router-dom";

export interface User{
    uid: number;
    userName: string;
    userPic: string;
    userTh: number;
    session: String;
}

export interface GalleryPost{
    bid: string;
    boardTitle: string;
    boardContents: string;
    boardView: number;
    boardCategory:string;
    userResponseDto: User;
    createdDate: number;
    thumbNaile: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;

    margin-left: 15vw;
    margin-right: 15vw;

`;

export const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`
const PageContainer = styled.div`

`;


export default function Gallery(){
    const { pageNum } = useParams();
    const[galleryItems, setGalleryItems] = useState<GalleryPost[]>([]);
    const[pageNumMax, setPageNumMax] = useState();

    useEffect(() => {
        const fetchGallery = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/board/list`,
                {params:{
                    "category": "GALLERY",
                    "page" : pageNum
                }}
            ).then(res => {
                setGalleryItems(res.data.contents);
            })
            
        }
        fetchGallery();
    }, [])

    return(
        <Wrapper>
            <HomeENGTitle>GALLERY</HomeENGTitle>
            <HomeKRTitle>갤러리</HomeKRTitle>
            <GalleryContainer>
                {galleryItems.map((item) => (
                    <GalleryItem key={item.bid}{...item} />
                ))}
            </GalleryContainer>  
            <PageContainer>
                
            </PageContainer>
        </Wrapper>
    )
}