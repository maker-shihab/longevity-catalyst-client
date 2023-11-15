export const setToLocalStorage = (key, token) => {
  if(!key || typeof window === 'undefined') {
    return ""
  }
  return localStorage.setItem(key, token);
}

export const getLocalStorage = (key) => {
  if(!key || typeof window === 'undefined') {
    return ""
  }
  return localStorage.getItem(key)
}