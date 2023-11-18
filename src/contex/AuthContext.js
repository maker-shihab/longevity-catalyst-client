import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authKey } from '../constants/storageKey';
import { removeUserInfo } from '../services/auth.service';
import { getLocalStorage, setToLocalStorage } from '../utils/local-storage';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const storeUserInfo = useCallback((token) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        setToLocalStorage(authKey, token);
    }, []);

    const getStoredUserInfo = useCallback(() => {
        const storedToken = getLocalStorage(authKey);
        if (storedToken) {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const logout = useCallback(() => {
        setAccessToken(null);
        setIsLoggedIn(false);
        removeUserInfo(authKey);
    }, []);

    useEffect(() => {
        getStoredUserInfo();
    }, [getStoredUserInfo]);

    const authContextValue = {
        accessToken,
        isLoggedIn,
        storeUserInfo,
        logout,
    };
    return (
        <AuthContext.Provider value={authContextValue} >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;