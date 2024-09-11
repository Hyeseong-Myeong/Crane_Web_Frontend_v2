import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"

interface pagenationProps{
    page: number;
    setPage: (page:number) => void;
    totalPages: number;
    goToPage : (page:number) => void;
    link: string;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`

const Button = styled.button`
    border: none;
    padding: 8px;
    margin: 0;
    color: #0F62FE;
    font-size: 1rem;

    &:hover {
        background: #A6C8FF;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: #A6C8FF;
        font-weight: bold;
        cursor: revert;
        transform: revert;
  }
`

export default function Pagination({page, setPage, totalPages} : pagenationProps){
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // URL에서 page 파라미터 값을 추출
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get('page');
        
        if (pageParam) {
            setPage(Number(pageParam));  // 페이지 상태 업데이트
        }
    }, [location.search]); 
    
    return(
        <Wrapper>
            <Button onClick={() => {
                    // setPage(page - 1)
                    // goToPage(page - 1)
                    navigate(`?page=${page - 1}`)
                }}
                disabled = {page === 1}>
                &lt; 이전
            </Button>
            {Array.from({ length: totalPages }).map(( _, i ) => (
                <Button
                    key={i + 1}
                    // onClick={() => setPage(i + 1)}
                    onClick={() => {
                        // setPage(i + 1)
                        // goToPage(i + 1)
                        navigate(`?page=${i + 1}`)
                    }}
                    aria-current={page === i + 1 ? "page" : undefined}
                >
                    {i + 1}
                </Button>
                ))
            }
            <Button onClick={() => {
                    // setPage(page + 1)
                    // goToPage(page + 1)
                    navigate(`?page=${page + 1}`)
                }}
                disabled = {page === totalPages}>
                다음 &gt;
            </Button>
        </Wrapper>
    )
}