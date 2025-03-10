import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"

interface pagenationProps{
    page: number;
    setPage: (page:number) => void;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
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
        cursor: not-allowed;
        transform: revert;

        &:hover {
            background: #e0e0e0; // disabled 상태일 때 hover 배경색 제거
            cursor: not-allowed; // disabled 상태일 때 hover 커서 제거
            transform: revert; // disabled 상태일 때 hover 변형 제거
        }
    }

    &[aria-current] {
        background: #A6C8FF;
        font-weight: bold;
        cursor: revert;
        transform: revert;
  }
`

export default function Pagination({page, setPage, totalPages, isFirst, isLast} : pagenationProps){
    
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
                    if(!isFirst){
                        navigate(`?page=${page - 1}`)
                    }
                }}
                disabled = {isFirst}>
                &lt; 이전
            </Button>
            {Array.from({ length: totalPages }).map(( _, i ) => (
                <Button
                    key={i + 1}
                    // onClick={() => setPage(i + 1)}
                    onClick={() => {
                        // setPage(i + 1)
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
                    navigate(`?page=${page + 1}`)
                }}
                disabled={isLast}>
                다음 &gt;
            </Button>
        </Wrapper>
    )
}