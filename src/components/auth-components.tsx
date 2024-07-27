import axios from "axios";

export default async function getUserInfo(){
    try{
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/userinfo`,
            {
                withCredentials: true
            },
        );
        
        if(res.status === 200){
            return res.data.data;
        }
        else{
            console.log(res);
            return null;
        }
        
    } catch(err){
        console.log("ERR : ", err )
        return null;
    }
}

export async function logout(){
    try{
        await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/logout`,
            {},
            {
                withCredentials: true   
            },
            
        );

        return true;
    }catch(err){
        console.log("로그아웃 실패")
        return false;
    }
}