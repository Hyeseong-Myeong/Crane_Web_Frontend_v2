import styled from "styled-components";

export const MenuBar = styled.div`
    display: flex;

    background-color: #333;
    overflow: hidden;
    justify-content: space-between;
    

    font-family: "Noto Sans KR";
    font-weight: 300;
`;

export const MenuGroup = styled.div`
    display: flex;

    flex-direction: row;

    align-items:center;

    margin-right: 36px;
`;


export const Logo = styled.img`
    width: 143px;
    height: 41px;
    padding: 13px;
    padding-left: 80px;
    
`;

export const MenuItem = styled.a`
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

export const MenuDropdown = styled.div`
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

export const Button = styled.button`
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


export const DropDownContents = styled.div`
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

export const DropMenuItem = styled.a`
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

export const SearchBar = styled.div`
    height: 48px;
    width: 256px;

    display: flex;
    align-items: center;
    
    background-color: white;
`;

export const SearchInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    border: none;

    flex-grow: 1;

    &:plcaeholder{
        color:gray;
    }
`;

export const SearchButton = styled.img`
    background: none;
    border: none;
`;


export const ProfileContainer = styled.div`
    float:right;
    overflow: hidden;
 
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
`;

export const Profile = styled.img`
    width: 48px;
    height: 48px;

    border-radius: 50%;
    align-items: center;
    justify-items: center;

`;

export const ProfileMenu = styled.div`
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

export const ProfileDropdown = styled.div`
    display:flex;
    flex-direction:column;
    color:white;

    font-family: "Noto Sans KR";
    font-weight: 300;
`;

export const ProfileMainBox = styled.a`
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

export const ProfileBlock = styled.a`
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

export const ProfileBlockName = styled.div`
    display:flex; 
    height:30px;

    white-space:nowrap;
    
`;

export const Text = styled.span`
    padding:10px;
`;

export const NumNotis = styled.div`
    background-color: tomato;
    border-radius: 50%;

    width: 24%;

    padding: 10px;

`;

export const LoginLink = styled.a`
    text-decoration: none;
    color: white;

    padding: 10px;

`

export const LoginLinkContainer = styled.div`
    padding: 20px;
`