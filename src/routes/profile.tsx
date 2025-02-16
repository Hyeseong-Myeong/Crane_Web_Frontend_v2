import styled from "styled-components"

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;

    font-family: "Noto Sans KR";
    min-height: 100vh;
`;

const SideBar = styled.div`
    width: 22%;

    @media (max-width: 768px) {
        width: 30%; /* 작은 화면에서 비율 조정 */
    }
`;

const MainPage = styled.div`
    background-color: #C1C7CD;
    width: 78%;

    @media (max-width: 768px) {
        width: 70%; /* 작은 화면에서 비율 조정 */
    }
`;

const Menu = styled.div`

`;

const Title = styled.div`
    font-family: "Noto Sans KR";

    font-weight: 600;
    font-size: 42px;
    
    padding: 20px;
`;

const Container = styled.div`
    margin: 20px;
    padding : 20px;
    width: 80%;

    background-color: white;
    border: 1px solid #DDE1E6;

`;

const ContainerTitle = styled.p`
    font-size: 18px;
    font-weight: 600;
`;


export default function Profile(){

    

    return (
        <Wrapper>
            <SideBar>
                <Menu>
                    Edit Profile
                </Menu>
                <Menu>
                    Account
                </Menu>
            </SideBar>
            <MainPage>
                <Title>
                    My Page
                </Title>
                <Container>
                    <ContainerTitle>Profile Photo: TBC</ContainerTitle>

                </Container>
                <Container>
                    <ContainerTitle>User Details</ContainerTitle>
                    <form>
                        <p>이름</p>
                        <input />
                        <p>전화번호</p>
                        <input />
                        
                    </form>
                </Container>
            </MainPage>
        </Wrapper>
    )
}