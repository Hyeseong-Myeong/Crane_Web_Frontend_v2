import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Button, DropDownContents, DropMenuItem, LoginLink, LoginLinkContainer, Logo, MenuBar, MenuDropdown, MenuGroup, MenuItem, NumNotis, Profile, ProfileBlock, ProfileBlockName, ProfileContainer, ProfileDropdown, ProfileMainBox, ProfileMenu, SearchBar, SearchButton, SearchInput, Text } from "./menu-bar-components";
import getUserInfo, { logout } from "./auth-components";
import {Footer, FooterGroup, LinkBox, LinkLogo, LinkLogoImg} from "./footer-components.ts"


const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 64px auto 200px;

    font-family: "Noto Sans KR";
`;


const MainContents = styled.div`
    /* margin-left: 15vw;
    margin-right: 15vw; */



    min-height: 100vh;
    
`;




export default function Layout(){
    //사용자 정보 초기화
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("익명");
    const [userprofilePic, setUserProfilePic] = useState("/cool_profile_pic.webp");
    const [NumNoti, setNumNoti] = useState(0);
    

    //로그인 상태 확인
    //로그인 정보 받아오기
    
    useEffect(() => {
        const init = async() => {
            //로그인 상태인 경우 사용자 로그인 정보 가져오기
                try{
                    const data = await getUserInfo();
                    if(data){
                        setIsLoggedIn(true);
                        setUsername(data.name);
                        setUserProfilePic(data.profilePic || "/cool_profile_pic.webp");
                        setNumNoti(data.numNoti || 0);
                    }
                }catch(err){
                    console.error("Err : ", err);
                }
            
          }

    init();
    }, [isLoggedIn]);

    //로그아웃 함수
    const handleLogout = async () => {
        try{
            const SuccessLogout =  await logout();
            if(SuccessLogout){
                setIsLoggedIn(false);
                //강제 새로고침
                window.location.reload();
            }
        }catch(err){
            console.error("Logout Failed: ", err);
        }
    };



    return(
        
        <Wrapper>
            <MenuBar>
                {/* <MenuList> */}
                    <MenuGroup>
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
                    </MenuGroup>

                    <MenuGroup>
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

                        {isLoggedIn ? 
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
                                        <ProfileBlock onClick={handleLogout}/*로그아웃 구현*/>
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
                        :
                            <LoginLinkContainer>
                                <LoginLink href="login">로그인</LoginLink>
                                <LoginLink href="signup">회원가입</LoginLink>
                            </LoginLinkContainer>
                        }                        
                    </MenuGroup>
                {/* </MenuList> */}
            </MenuBar>
            <MainContents>
                <Outlet />
            </MainContents>

            <Footer>
                <FooterGroup>
                    <Logo src="/logo(black).png">

                    </Logo>
                </FooterGroup>
                <FooterGroup>
                    <LinkBox href="https://www.instagram.com/crane__sch/">
                        <LinkLogo>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="white">
                                <path d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34" transform="translate(-2.5 -2.5)"/>
                            </svg>  
                        </LinkLogo>
                        <Text>
                            인스타 바로가기
                        </Text>
                    </LinkBox>
                    <LinkBox href="https://www.youtube.com/@crane_sch">
                        <LinkLogoImg src="YouTube_light_icon_(2017).png" />
                        <Text>
                            유튜브 바로가기
                        </Text>
                    </LinkBox>
                    
                    <Text>
                        순천향대학교 중앙동아리 락밴드 크레인 _ SINCE 1982
                    </Text>
                </FooterGroup>
            </Footer>
        </Wrapper>
    )
}