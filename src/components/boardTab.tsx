import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div`
    display:flex;


`

const Selector = styled.div`
    padding: 10px;
    cursor: pointer;

    font-size: 16px;


    &:hover {
        background-color: #f0f0f0;
    }
`;





interface BoardTabProps {
    category: string;
    setCategory: (selectedCategory: string) => void;
}


export default function BoardTab({category, setCategory}: BoardTabProps){
    const navigate = useNavigate();

    const handleSelectCategory = (selectedCategory: string) => {
        setCategory(selectedCategory);
        navigate(`/board?category=${selectedCategory}&page=1`);
    };

    return(
        <Wrapper>
            <Selector
                onClick={() => handleSelectCategory('NOTICE')}
                style={{
                    fontWeight: category === 'NOTICE' ? 'bold' : 'normal',
                    borderBottom: category === 'NOTICE' ? '2px solid #001D6C' : ''
                }}
            >      
                {/* <Link to='/board?category=NOTICE&page=1' style={{textDecoration:'None', color:'black'}}></Link>  */}
                공지게시판
            </Selector>
            <Selector
                onClick={() => handleSelectCategory('FREE')}
                style={{
                    fontWeight: category === 'FREE' ? 'bold' : 'normal',
                    borderBottom: category === 'FREE' ? '2px solid #001D6C' : ''
                    }}
            >
                {/* <Link to='/board?category=FREE&page=1' style={{textDecoration:'None', color:'black'}}></Link> */}
                자유게시판  
            </Selector>
            <Selector
                onClick={() => handleSelectCategory('INSTRUMENT')}
                style={{
                    fontWeight: category === 'INSTRUMENT' ? 'bold' : 'normal',
                    borderBottom: category === 'INSTRUMENT' ? '2px solid #001D6C' : ''
                    }}
            >                
                {/* <Link to='/board?category=INSTRUMENT&page=1' style={{textDecoration:'None', color:'black'}}></Link>  */}
                장비게시판
            </Selector>
            <Selector
                onClick={() => handleSelectCategory('ADMIN')}
                style={{
                    fontWeight: category === 'ADMIN' ? 'bold' : 'normal',
                    borderBottom: category === 'ADMIN' ? '2px solid #001D6C' : ''
                    }}
            >
                {/* <Link to='/board?category=ADMIN&page=1' style={{textDecoration:'None', color:'black'}}></Link> */}
                임원게시판 
            </Selector>
        </Wrapper>
    )
}