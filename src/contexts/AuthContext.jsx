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
  // const [loading, setLoading]
  const loadUserProfile = useCallback(async () => {
    if (accessToken) {
      try {
        setLoading(true)
        const response = await userApi.getUserProfile(accessToken);
        if(response?.data?.ok=== true) {
          try {
            setUser({...response.data?.d, avatar: constant.URL_AVATAR_URER + response?.data?.d?.photo_token});  
            // if find user , check user linked account        
            try {
              const response= await userApi.getUserLinkAccountList()
              if(response?.data?.ok=== true) {
                  setUserLinkAccountList(response?.data?.d?.filter(item=> item?.isLogin=== true))
                  if(selectedLinkAccount) {
                    // setSelectedLinkAccount(respo)
                    if(response?.data?.d?.find(item=> item?._id === selectedLinkAccount && item?.isLogin=== true)) {
                      setSelectedLinkAccount(selectedLinkAccount)
                      setDataSelectedLinkAccount(response?.data?.d?.find(item=> item?._id === selectedLinkAccount))
                    }
                    else {
                      setSelectedLinkAccount(undefined)
                      setDataSelectedLinkAccount(undefined)
                    }
                  } 
                  else if(isLogout=== true) {
                    setSelectedLinkAccount(undefined)
                  }
                  else if(response?.data?.d?.find(item=> item?.isLogin=== true)) {
                    // localStorage.setItem("linkAccount", response?.data?.d?.filter(item=> item?.isLogin=== true)[0]?._id)
                    // setSelectedLinkAccount(response?.data?.d?.filter(item=> item?.isLogin=== true)[0]?._id)
                    // setDataSelectedLinkAccount(response?.data?.d?.filter(item=> item?.isLogin=== true)[0])
                  }
              }
            } catch (error) {
              
            } 
          } catch (error) {
            setUser({...response.data?.d, avatar: null});          
          }
        }
      } catch (error) {
        console.error('Failed to load user profile', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem("linkAccount")
        setUserLinkAccountList([])
        setSelectedLinkAccount(undefined)
        setDataSelectedLinkAccount(undefined)
        setAccessToken(undefined)
        if(error?.response?.status=== 401) {
          window.location.href= window.location.origin + "/login"
        }
      }
      finally {
        setLoading(false);
      }
    }
    else {
      setLoading(false)
    }
  }, [accessToken, selectedLinkAccount, isLogout]);

  const logoutFromSystem= ()=> {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("linkAccount")
    setUserLinkAccountList([])
    setSelectedLinkAccount(undefined)
    setDataSelectedLinkAccount(undefined)
    setAccessToken(undefined)
  }

  const logoutToConnect= ()=> {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUserLinkAccountList([])
    setSelectedLinkAccount(undefined)
    setDataSelectedLinkAccount(undefined)
  }

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile, accessToken]);
  // 
  useEffect(()=> {
    (async ()=> {
      
    })()
  }, [selectedLinkAccount, isLogout])
  // useEffect(()=> {

  // }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser, selectedLinkAccount, userLinkAccountList , dataSelectedLinkAccount, setDataSelectedLinkAccount, setSelectedLinkAccount, setAccessToken, isLogout, setIsLogout, accessToken,logoutFromSystem, logoutToConnect }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
