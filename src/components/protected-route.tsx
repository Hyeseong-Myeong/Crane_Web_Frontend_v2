import { Navigate } from "react-router-dom";
import getUserInfo from "./auth-components";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}){

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
            setIsLoading(false);
        }

        fetchUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(user == null){
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}