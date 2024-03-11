import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
export const useAuth = () =>{
    const value = useContext(AuthContext);
    return value;
}

export const AuthContextProvider =({children}) =>{
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsub=onAuthStateChanged(auth,(user)=>{
            setUser(user);
        })
        return () => {
            unsub();
        };
    }, [user]);
    
    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}