import sessionApi from 'api/session/sessionApi'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { SocketContext } from './SocketContext'
import { showToast } from 'components/toast/toast'
// import portfolioApi from 'api/portfolios/portfolioApi'
import copytradeApi from 'api/copytrade/copytradeApi'

export const ManualTradeContext= createContext()
const ManualTradeProvider = ({children}) => {
  const [dataSignal, setDataSignal]= useState([])
  const [data, setData] = useState([]);
  const [dataStat, setDataStat] = useState();
  const [loading, setLoading]= useState()
  const { isConnected, socket } = useContext(SocketContext);
  const fetchGlobalLastResult = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sessionApi.getGlobalLastResults();
      if (response?.data?.ok === true) {
        setDataSignal(response?.data?.d);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const fetCopytradeHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await copytradeApi.userCopytradeHistory();
      if (response?.data?.ok === true) {
        const dataResult = mergeAndSortData(response?.data);
        setData(dataResult);
      } else {
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCopytradeStat = useCallback(async () => {
    try {
      setLoading(true);
      const response = await copytradeApi.userCopytradeStaticstic();
      if (response?.data?.ok === true) {
        setDataStat(response?.data?.d);
      } else {
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
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
  }, [fetchGlobalLastResult]);

  useEffect(() => {
    fetCopytradeHistory();
  }, [fetCopytradeHistory]);

  useEffect(() => {
    fetchCopytradeStat();
  }, [fetchCopytradeStat]);


  useEffect(() => {
    if (isConnected) {
      socket.on("LAST_RESULTS", (data) => {
        setDataSignal(data);
      });
    }
  }, [isConnected, socket, dataSignal]);

  return (
    <ManualTradeContext.Provider value={{ dataSignal, setDataSignal, data, setData, dataStat, setDataStat}}>
      {children}
    </ManualTradeContext.Provider>
  )
}

export default ManualTradeProvider
