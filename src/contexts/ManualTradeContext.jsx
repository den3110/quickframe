import sessionApi from 'api/session/sessionApi'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { SocketContext } from './SocketContext'
import { showToast } from 'components/toast/toast'
// import portfolioApi from 'api/portfolios/portfolioApi'
import copytradeApi from 'api/copytrade/copytradeApi'
import AuthContext from './AuthContext'

export const ManualTradeContext= createContext()
const ManualTradeProvider = ({children}) => {
  const [dataSignal, setDataSignal]= useState([])
  const [data, setData] = useState([]);
  const [dataStat, setDataStat] = useState();
  const [loading, setLoading]= useState()
  const { isConnected, socket } = useContext(SocketContext);
  const {selectedLinkAccount }= useContext(AuthContext)
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
      const response = await copytradeApi.userCopytradeHistory({}, selectedLinkAccount);
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
  }, [selectedLinkAccount]);

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

  useEffect(() => {
    if (isConnected) {
      socket.on("ADD_OPEN_ORDER", (dataSocket) => {
        // setDataSignal(data);
        let dataTemp= data
        const index = dataTemp?.findIndex(
          (item) => item.betTime === dataSocket.betTime && dataSocket.autoType === 4);
        console.log("index", index)
        if (index !== -1) {
          dataTemp[index] = dataSocket;
        } else {
          const index = dataTemp?.find(
            (item) => item.betTime !== dataSocket.betTime && dataSocket.autoType === 4
          );
          if (index) {
            dataTemp = [dataSocket, ...dataTemp];
          }
        }
        setData(dataTemp)
      });
    }
  }, [isConnected, socket, data]);

  return (
    <ManualTradeContext.Provider value={{ dataSignal, setDataSignal, data, setData, dataStat, setDataStat}}>
      {children}
    </ManualTradeContext.Provider>
  )
}

export default ManualTradeProvider
