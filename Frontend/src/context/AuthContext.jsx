import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
    const logout=()=>{
        localStorage.removeItem('userInfo');
        setUser(null);
        window.location.href = '/login';
    }
    // When the app starts, check if a user is already in the "Locker"
    useEffect(() => {
        const savedUser = localStorage.getItem('userInfo');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            console.log(savedUser)
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser ,loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
};