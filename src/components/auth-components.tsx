import axios from "axios";

export default async function getUserInfo(){
    axios.get(
        `${import.meta.env.VITE_API_URL}/users/userinfo`,
        {withCredentials: true},
    ).then(res =>{
        if(res.status === 401){
            console.log(res);
        }
        return res;
    }).catch(err =>{
        console.log("ERR: ", err);
    });
}