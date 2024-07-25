import userApi from 'api/user/userApi';
import { constant } from 'constant/constant';
import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLinkAccountList, setUserLinkAccountList]= useState([])
  const [selectedLinkAccount, setSelectedLinkAccount]= useState(localStorage.getItem("linkAccount") ? localStorage.getItem("linkAccount") : undefined)
  const [dataSelectedLinkAccount, setDataSelectedLinkAccount]= useState()
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken]= useState(localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : undefined)
  const [isLogout, setIsLogout]= useState(false)
  const loadUserProfile = useCallback(async () => {
    if (accessToken) {
      try {
        const response = await userApi.getUserProfile(accessToken);
        if(response?.data?.ok=== true) {
          try {
            setUser({...response.data?.d, avatar: constant.URL_AVATAR_URER + response?.data?.d?.photo_token});          
          } catch (error) {
            setUser({...response.data?.d, avatar: null});          
          }
        }
      } catch (error) {
        console.error('Failed to load user profile', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile, accessToken]);

  useEffect(()=> {
    (async ()=> {
      try {
        const response= await userApi.getUserLinkAccountList()
        if(response?.data?.ok=== true) {
            setUserLinkAccountList(response?.data?.d?.filter(item=> item?.isLogin=== true && item?._id === selectedLinkAccount))
            console.log(1)
            if(selectedLinkAccount) {
              console.log(selectedLinkAccount)
              console.log(2)
              // setSelectedLinkAccount(respo)\
              if(response?.data?.d?.find(item=> item?._id === selectedLinkAccount && item?.isLogin=== true)) {
                console.log(22)
                setSelectedLinkAccount(selectedLinkAccount)
                setDataSelectedLinkAccount(response?.data?.d?.find(item=> item?._id === selectedLinkAccount))
              }
            } 
            else if(isLogout=== true) {
              setSelectedLinkAccount(undefined)
              console.log(4)
            }
            else if(response?.data?.d?.find(item=> item?.isLogin=== true)) {
              console.log(5)
              // localStorage.setItem("linkAccount", response?.data?.d?.filter(item=> item?.isLogin=== true)[0]?._id)
              // setSelectedLinkAccount(response?.data?.d?.filter(item=> item?.isLogin=== true)[0]?._id)
              // setDataSelectedLinkAccount(response?.data?.d?.filter(item=> item?.isLogin=== true)[0])
            }
        }
      } catch (error) {
      } 
    })()
  }, [selectedLinkAccount, isLogout])

  // useEffect(()=> {

  // }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser, selectedLinkAccount, userLinkAccountList , dataSelectedLinkAccount, setDataSelectedLinkAccount, setSelectedLinkAccount, setAccessToken, isLogout, setIsLogout, accessToken, }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
