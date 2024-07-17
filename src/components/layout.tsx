import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 64px auto 200px;
`;


const MenuBar = styled.div`
    display: flex;

    background-color: #333;
    overflow: hidden;
    justify-content: space-between;
    

    font-family: "Noto Sans KR";
    font-weight: 300;
`;

// const MenuList = styled.div`
//     display: flex;

// `;

const MenuGroupLeft = styled.div`
    display: flex;

`;

const MenuGroupRight = styled.div`
    display: flex;
    flex-direction: row;

    align-items:center;

    margin-right: 36px;
`;

const Logo = styled.img`
    width: 143px;
    height: 41px;
    padding: 13px;
    padding-left: 80px;
    
`;

const MenuItem = styled.a`
    color: white;
    font-size: 16px;
    text-align: center;
    text-decoration: none;

    padding: 24px;
    float: left;

    
    &:hover{
        background-color:grey;
    }
`;

const MenuDropdown = styled.div`
    float: left;
    overflow: hidden;

    
    border: none;
    outline: none;
    color: white;
    padding: 4px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;

`;

const Button = styled.button`
    font-size: 16px;  
    border: none;
    outline: none;
    color: white;
    padding: 16px 16px;

    background-color: inherit;
    font-family: inherit;
    margin: 0;

    &:hover{
        background-color:grey;
    }
`;


const DropDownContents = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    font-weight:300;

    ${MenuDropdown}:hover &{
        display:block;
    }
`;

const DropMenuItem = styled.a`
    float: none;
    color: black;
    padding: 18px 16px;
    text-decoration: none;
    display: block;
    text-align: left;

    &:hover{
        background-color:grey;
    }
`;

const SearchBar = styled.div`
    height: 48px;
    width: 256px;

    display: flex;
    align-items: center;
    
    background-color: white;
`;

const SearchInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    border: none;

    flex-grow: 1;

    &:plcaeholder{
        color:gray;
    }
`;

const SearchButton = styled.img`
    background: none;
    border: none;
`;


const ProfileContainer = styled.div`
    float:right;
    overflow: hidden;
 
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
`;

const Profile = styled.img`
    width: 48px;
    height: 48px;

    border-radius: 50%;
    align-items: center;
    justify-items: center;

`;

const ProfileMenu = styled.div`
    width:360px;
    
    background-color:#333;


    display:none;
    min-width: 360px;
    min-height: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    position:absolute;
    right:24px;

    border-radius:10px;

    ${ProfileContainer}:hover &{
        display:block;
    }
`;

const ProfileDropdown = styled.div`
    display:flex;
    flex-direction:column;
    color:white;

    font-family: "Noto Sans KR";
    font-weight: 300;
`;

const ProfileMainBox = styled.a`
    display:flex;
    flex-direction:column;

    align-items:center;

    margin:10px;
    padding: 10px;
    border-radius:10px;

    color:inherit;
    text-decoration:none;

    &:hover{
        background-color:rgb(255,255,255,0.2);
    }
`;

const ProfileBlock = styled.a`
    display:flex;
    justify-content: space-between;

    margin:10px;
    padding: 10px;
    border-radius:10px;

    color:inherit;
    text-decoration:none;

    align-content: center;

    &:hover{
        background-color:rgb(255,255,255,0.2);
    }
`

const ProfileBlockName = styled.div`
    display:flex; 
    height:30px;

    white-space:nowrap;
    
`;

const Text = styled.span`
    padding:10px;
`;

const NumNotis = styled.div`
    background-color: tomato;
    border-radius: 50%;

    width: 24%;

    padding: 10px;

`;



export default function Layout(){
    //사용자 정보 초기화
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [username, setUsername] = useState("익명");
    const [userprofilePic, setUserProfilePic] = useState("/cool_profile_pic.webp")
    const [NumNoti, setNumNoti] = useState(0);
    //로그인 상태 확인
    //로그인 정보 받아오기

    return(
        <Wrapper>
            <MenuBar>
                {/* <MenuList> */}
                    <MenuGroupLeft>
                        {/* 로고 */}
                        <Link to="/"><Logo src="/logo(white).png"/></Link>
                        {/* Info */}
                        <MenuItem href="/info">
                            Info
                        </MenuItem>

                        {/* Gallery */}
                        <MenuItem href="/gallery">
                            Gallery
                        </MenuItem>
                        
                        {/* Board */}
                        <MenuItem href="/board">
                            Board
                        </MenuItem>
                        
                        {/* OnlyforCrane */}
                        <MenuDropdown>
                            <Button>
                                For CRANE▼
                            </Button>
                            <DropDownContents>
                                {/* reservation */}
                                <DropMenuItem href="/reservation">
                                    Reservation
                                </DropMenuItem>

                                {/* team */}
                                <DropMenuItem href="/team">
                                    Team
                                </DropMenuItem>
                                
                                {/* mypage */}
                                <DropMenuItem href="/profile">
                                    My CRANE
                                </DropMenuItem>
                            </DropDownContents>                        
                        </MenuDropdown>
                    </MenuGroupLeft>

                    <MenuGroupRight>
                        {/* search */}        
                        <SearchBar>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 36 36" fill="currentColor" className="size-6" color="grey">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                            <SearchInput placeholder="Search for...">

                            </SearchInput>
                            <SearchButton>

                            </SearchButton>
                        </SearchBar>

                        <ProfileContainer>
                            <Profile src={userprofilePic} />
                            <ProfileMenu>
                                <ProfileDropdown>
                                    <ProfileMainBox href="/profile">
                                        <Profile src={userprofilePic} />
                                        <Text>{username}</Text>
                                    </ProfileMainBox>
                                    <ProfileBlock href="/notification">
                                        <ProfileBlockName>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                            </svg>
                                            <Text>알림</Text>
                                        </ProfileBlockName>
                                        <Text>{NumNoti == 0 ? "알림없음" : <NumNotis>{NumNoti}</NumNotis>}</Text>
                                    </ProfileBlock>
                                    <ProfileBlock href="/profile">
                                        <ProfileBlockName>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        <Text>프로필 설정</Text>
                                        </ProfileBlockName>
                                    </ProfileBlock>
                                    <ProfileBlock /*로그아웃 관련 설정 필요*/>
                                        <ProfileBlockName>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                        </svg>

                                            <Text>로그아웃</Text>
                                        </ProfileBlockName>
                                    </ProfileBlock>
                                </ProfileDropdown>
                            </ProfileMenu>
                        </ProfileContainer>                        
                    </MenuGroupRight>
                {/* </MenuList> */}
            </MenuBar>
            <Outlet />
        </Wrapper>
    )
}