import axios from "axios";

export default async function getUserInfo(){
    axios.get(
        `${import.meta.env.VITE_API_URL}/users/userinfo`,
        {withCredentials: true},
    ).then(res =>{
        if(res.status === 200){
            return;
        }else{
            console.log(res);
            return null;
        }
    }).catch(err =>{
        console.log("ERR: ", err);
    });
}