import userApi from 'api/user/userApi';
import { constant } from 'constant/constant';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLinkAccountList, setUserLinkAccountList]= useState([])
  const [selectedLinkAccount, setSelectedLinkAccount]= useState(localStorage.getItem("linkAccount") ? localStorage.getItem("linkAccount") : undefined)
  const [dataSelectedLinkAccount, setDataSelectedLinkAccount]= useState()
  const [loading, setLoading] = useState(true);
  const loadUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

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
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(()=> {
    (async ()=> {
      try {
        const response= await userApi.getUserLinkAccountList()
        if(response?.data?.ok=== true) {
          setUserLinkAccountList(response?.data?.d)
          if(localStorage.getItem("linkAccount")) {
            // setSelectedLinkAccount(respo)
            setSelectedLinkAccount(localStorage.getItem("linkAccount"))
            setDataSelectedLinkAccount(response?.data?.d?.find(item=> item?._id === localStorage.getItem("linkAccount")))
          }
          // else {
          //   setSelectedLinkAccount(response?.data?.d?.[0]?._id)
          //   localStorage.setItem("linkAccount", response?.data?.d?.[0]?._id)
          //   setDataSelectedLinkAccount(response?.data?.d?.find(item=> item?._id === response?.data?.d?.[0]?._id))
          // }
        }
      } catch (error) {
        
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser, selectedLinkAccount, userLinkAccountList , dataSelectedLinkAccount, setSelectedLinkAccount}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
