import { createContext, useCallback, useEffect, useState } from 'react';
import { authApi } from '../api';
import { authKey } from '../constants/storageKey';
import { logoutRequest, removeUserInfo } from '../services/auth.service';
import { decodedToken } from '../utils/jwt';
import { getLocalStorage, setToLocalStorage } from '../utils/local-storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = useCallback(async (accessToken) => {
        const { userId } = decodedToken(accessToken);
        const response = await authApi.getUserProfile(userId);
        setUserInfo(response.data.data);
    }, []);

    const handleLoginSuccess = useCallback(({ accessToken }) => {
        setIsLoggedIn(true);
        setToLocalStorage(authKey, accessToken);
        fetchUserInfo(accessToken);
    }, [fetchUserInfo]);

    const getStoredUserInfo = useCallback(() => {
        const accessToken = getLocalStorage(authKey);
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        await logoutRequest();
        setIsLoggedIn(false);
        removeUserInfo(authKey);
        setUserInfo(null);
    }, []);

    useEffect(() => {
        getStoredUserInfo();
    }, [getStoredUserInfo]);

    useEffect(() => {
        const accessToken = getLocalStorage(authKey);
        if (accessToken) {
            fetchUserInfo(accessToken);
        } else {
            setUserInfo(null);
            removeUserInfo(authKey);
        }
    }, [fetchUserInfo]);


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