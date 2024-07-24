import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import decodeJWT from 'util/jwtDecode'
import AuthContext from './AuthContext'

export const JwtContext= createContext()

const JwtProvider = ({children}) => {
  const [decodedData, setDecodedData] = useState(null);
  const {accessToken }= useContext(AuthContext)
  
  useEffect(()=> {
    try {
      if (accessToken) {
        const decoded = decodeJWT(accessToken);
        setDecodedData(decoded);
      }
    } catch (error) {
      // window.location.pr
    }
  }, [accessToken])
  return (
    <JwtContext.Provider value={{decodedData}}>
      {children}
    </JwtContext.Provider>
  )
}

export default JwtProvider
