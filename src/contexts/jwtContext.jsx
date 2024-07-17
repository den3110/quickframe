import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import decodeJWT from 'util/jwtDecode'

export const JwtContext= createContext()

const JwtProvider = ({children}) => {
  const [decodedData, setDecodedData] = useState(null);
  
  useEffect(()=> {
    try {
      const accessToken= localStorage.getItem("accessToken")
      if (accessToken) {
        const decoded = decodeJWT(accessToken);
        setDecodedData(decoded);
      }
    } catch (error) {
      // window.location.pr
    }
  }, [])
  return (
    <JwtContext.Provider value={{decodedData}}>
      {children}
    </JwtContext.Provider>
  )
}

export default JwtProvider
