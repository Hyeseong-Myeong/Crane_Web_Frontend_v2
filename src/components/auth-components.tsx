import axios from "axios";
import { FCMlogout } from "../config/firebase";

export default async function getUserInfo(){

    const token = localStorage.getItem('authorization');

    try{
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/my`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
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
    const token = localStorage.getItem('authorization');

    try{
        await axios.post(
            `${import.meta.env.VITE_API_URL}/users/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
            
        );
        FCMlogout();
        localStorage.removeItem('authorization');
        
        return true;
    }catch(err){
        console.log("로그아웃 실패")
        return false;
    }
}