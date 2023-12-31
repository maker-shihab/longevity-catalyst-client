import { createContext, useCallback, useEffect, useState } from 'react';
import { authApi } from '../api';
import { authKey } from '../constants/storageKey';
import { logoutRequest, removeUserInfo } from '../services/auth.service';
import { decodedToken } from '../utils/jwt';
import { getLocalStorage, setToLocalStorage } from '../utils/local-storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const handleLoginSuccess = useCallback(({ token }) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        setToLocalStorage(authKey, token);
    }, []);

    const handleLogout = useCallback(async () => {
        await logoutRequest();
        setAccessToken(null);
        setIsLoggedIn(false);
        removeUserInfo(authKey);
        setUserInfo(null);
    }, []);

    const fetchUserInfo = useCallback(async (token) => {
        const { userId } = decodedToken(token);
        const response = await authApi.getUserProfile(userId);
        setUserInfo(response.data.data);
    }, []);

    const getStoredUserInfo = useCallback(() => {
        const storedToken = getLocalStorage(authKey);
        if (storedToken) {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        getStoredUserInfo();
    }, [getStoredUserInfo]);

    useEffect(() => {
        if (accessToken) {
            fetchUserInfo(accessToken);
        } else {
            setUserInfo(null);
            // removeUserInfo(authKey);
        }
    }, [accessToken, fetchUserInfo]);


    const authContextValue = {
        isLoggedIn,
        handleLoginSuccess,
        handleLogout,
        userInfo
    };

    return (
        <AuthContext.Provider value={authContextValue} >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;