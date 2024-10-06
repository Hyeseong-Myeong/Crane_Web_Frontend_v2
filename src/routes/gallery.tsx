import styled from "styled-components"
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryItem from "../components/gallery-item";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

export interface User{
    uid: number;
    userName: string;
    userPic: string;
    userTh: number;
    session: String;
}

export interface BoardPost{
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
    // const { page } = useParams();
    const[page, setPage] = useState<number>(1);
    const[galleryItems, setGalleryItems] = useState<BoardPost[]>([]);
    const[pageSize, setPageSize] = useState();
    const[totalElements, setTotalElements] = useState();
    const[totalPages, setTotalPages] = useState<number>(1);
    const[isFirst, setIsFirst] = useState();
    const[isLast, setIsLast] = useState();
    const[isEmpty, setIsEmpty] = useState();
    const[pageNumber, setPageNumber] = useState<number>(Number(page) || 1);

    const location = useLocation();

    // const query = new URLSearchParams(location.search);

    // const goToPage = (pageNumber:number) => {
    //     query.set('page', pageNumber.toString());
    //     navigate(`${location.pathname}?${query.toString()}`);
    // };


    useEffect(() => {
        const fetchGallery = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/board/list`,
                {params:{
                    "category": "GALLERY",
                    "page" : page - 1
                }}
            ).then(res => {
                setGalleryItems(res.data.contents);
                setPageSize(res.data.pageSize);
                setTotalElements(res.data.totlaElements);
                setTotalPages(res.data.totalPages);
                setIsFirst(res.data.first);
                setIsLast(res.data.last);
                setIsEmpty(res.data.empty);
            })
            
        }
        fetchGallery();
        setPageNumber(Number(page) || 1); 
    }, [page])

    
    useEffect(() => {
        // URL에서 page 값을 읽어옴
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get('page');
        
        if (pageParam) {
            setPage(Number(pageParam));  // 페이지 상태 업데이트
        }
    }, [location.search]);  // location.search가 바뀔 때마다 실행

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
                <Pagination
                    page={pageNumber}
                    setPage = {setPageNumber}
                    totalPages={totalPages}
                    link = {`gallery`}
                />
            </PageContainer>
        </Wrapper>
    )
}