import styled from "styled-components"
import { HomeENGTitle, HomeKRTitle } from "../components/page-components";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryItem from "../components/gallery-item";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

// export interface User{
//     uid: number;
//     writer: string;
//     userPic: string;
//     userTh: number;
//     session: String;
// }

export interface BoardPost{
    boardId: string;
    title: string;
    content: string;
    view: number;
    boardCategory:string;
    writer: string
    createdAt: number;
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
const Write = styled.a`
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


export default function Gallery(){
    // const { page } = useParams();
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const[page, setPage] = useState<number>(1);
    const[galleryItems, setGalleryItems] = useState<BoardPost[]>([]);
    const[pageSize, setPageSize] = useState();
    const[totalElements, setTotalElements] = useState();
    const[totalPages, setTotalPages] = useState<number>(1);
    const[isFirst, setIsFirst] = useState();
    const[isLast, setIsLast] = useState();
    const[isEmpty, setIsEmpty] = useState();
    const[pageNumber, setPageNumber] = useState<number>(Number(page) || 1);
    const [userRole, setUserRole] = useState("")

    const token = localStorage.getItem('authorization');

    const location = useLocation();

    // const query = new URLSearchParams(location.search);

    // const goToPage = (pageNumber:number) => {
    //     query.set('page', pageNumber.toString());
    //     navigate(`${location.pathname}?${query.toString()}`);
    // };


    useEffect(() => {
        const fetchGallery = async() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/boards/category/GALLERY`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }  
                },
            ).then(res => {
                setGalleryItems(res.data.data.content);
                setPageSize(res.data.data.size);
                setTotalElements(res.data.data.totalElements);
                setTotalPages(res.data.data.totalPages);
                setIsFirst(res.data.data.first);
                setIsLast(res.data.data.last);
                setIsEmpty(res.data.data.empty);
                setLoading(false); // 데이터 로딩 완료 후 loading 상태 변경
            }).catch(error => {
                console.error("Error fetching gallery data: ", error);
                setLoading(false);
            });
        }
        fetchGallery();
        setPageNumber(Number(page) || 1); 
    }, [page])

    useEffect(()=> {
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
                console.log(res)
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
            {
                loading ? (
                    <div> Loading...</div>
                ) : (
                    <GalleryContainer>
                {galleryItems.map((item) => (
                    <GalleryItem key={item.boardId}{...item} />
                ))}
            </GalleryContainer>
                )
            }  
            {(userRole === "ADMIN" || userRole === "MANAGER") && (
                <Write href={`/board/edit`}>글쓰기</Write>
            )}
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