import styled from "styled-components";

export const Footer = styled.footer`
    
    background-color:#697077;

    bottom: 0;
    left: 0;

    width: 100%;
    height: 200px;

    display:flex;
    justify-content: space-between;

`;

export const FooterGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-self:center;

    padding: 24px;
    
    color: white;
    font-family: "Noto Sans KR";
    font-weight: 200;
`;

export const LinkBox = styled.a`
    display:flex;

    align-items: center;


    text-decoration: none;
    color: white;

    font-family: "Noto Sans KR";
    font-weight: 300;
`;

export const LinkLogo = styled.div`
    height:24px;
    width:24px;
    
    margin-left: 10px;

`;

export const LinkLogoImg = styled.img`
    height:24px;    

    margin-left: 10px;;
`;