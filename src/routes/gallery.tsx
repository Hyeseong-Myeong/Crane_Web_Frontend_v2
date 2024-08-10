import styled from "styled-components"
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryItem from "../components/gallery-item";


export interface GalleryPost{
    bid: string;
    boardTitle: string;
    boardContents: string;
    boardView: number;
    boardCategory:string;
    userId: string;
    userName: string;
    createdDate: number;
    userPic: string;
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


export default function Gallery(){

    const[galleryItems, setGalleryItems] = useState<GalleryPost[]>([]);


    useEffect(() => {
        const fetchGallery = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/board/list`,
                {params:{
                    "BoardCategory": "GALLERY"
                }}
            ).then(res => {
                setGalleryItems(res.data);
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
        </Wrapper>
    )
}