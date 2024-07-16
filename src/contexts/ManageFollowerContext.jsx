import sessionApi from 'api/session/sessionApi'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { SocketContext } from './SocketContext'
import { showToast } from 'components/toast/toast'
import copytradeApi from 'api/copytrade/copytradeApi'
// import portfolioApi from 'api/portfolios/portfolioApi'

export const ManageFollowerContext= createContext()
const ManageFollowerProvider = ({children}) => {
  const [data, setData] = useState({followList: [], blockList: []});
  const [loading, setLoading]= useState()
  const [change, setChange]= useState(false)
  const { isConnected, socket } = useContext(SocketContext);
  const fetchGlobalLastResult = useCallback(async () => {
    try {
      setLoading(true);
      const response = await copytradeApi.userCopytradeFollower();
      if (response?.data?.ok === true) {
        setData(response?.data?.d);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const mergeAndSortData = (data) => {
    const { open, close } = data;
    const combined = [...open, ...close];
    combined.sort((a, b) => b.betTime - a.betTime);
    return combined;
  };

  useEffect(() => {
    fetchGlobalLastResult();
  }, [fetchGlobalLastResult, change]);

  return (
    <ManageFollowerContext.Provider value={{ data, setData, loading, setChange }}>
      {children}
    </ManageFollowerContext.Provider>
  )
}

export default ManageFollowerProvider
