

import { authKey } from "../constants/storageKey";
import { baseUrl } from "../globals";
import { instance as axoisInstance } from "../helpers/axios/axoisInstance";
import { decodedToken } from "../utils/jwt";
import { getLocalStorage, setToLocalStorage } from "../utils/local-storage";


export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken)
}

export const getUserInfo = () => {
  const authToken = getLocalStorage(authKey);
  if(authToken) {
    const decodeadData = decodedToken(authToken);
    return decodeadData
  } else {
    return ""
  }
};

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};

export const isLoggdIn = () => {
  const authToken = getLocalStorage(authKey);
  return !!authToken
}

export const getNewAccessToken = async () => {
  return await axoisInstance({
    url: `${(baseUrl)}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};