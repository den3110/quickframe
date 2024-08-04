import sessionApi from 'api/session/sessionApi';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { SocketContext } from './SocketContext';
import { showToast } from 'components/toast/toast';
// import portfolioApi from 'api/portfolios/portfolioApi'
import copytradeApi from 'api/copytrade/copytradeApi';
import AuthContext from './AuthContext';
import _ from 'lodash';

export const ManualTradeContext = createContext();

const ManualTradeProvider = ({ children }) => {
  const [dataSignal, setDataSignal] = useState([]);
  const [data, setData] = useState([]);
  const [dataStat, setDataStat] = useState();
  const [loading, setLoading] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const { selectedLinkAccount } = useContext(AuthContext);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const fetchGlobalLastResult = sessionApi.getGlobalLastResults();
      const fetchCopytradeHistory = copytradeApi.userCopytradeHistory({}, selectedLinkAccount);
      const fetchCopytradeStat = copytradeApi.userCopytradeStaticstic({}, selectedLinkAccount);

      const [globalLastResult, copytradeHistory, copytradeStat] = await Promise.all([
        fetchGlobalLastResult,
        fetchCopytradeHistory,
        fetchCopytradeStat,
      ]);

      if (globalLastResult?.data?.ok) {
        setDataSignal(globalLastResult.data.d);
      }

      if (copytradeHistory?.data?.ok) {
        const dataResult = mergeAndSortData(copytradeHistory.data);
        setData(dataResult);
      }

      if (copytradeStat?.data?.ok) {
        setDataStat(copytradeStat.data.d);
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    } finally {
      setLoading(false);
    }
  }, [selectedLinkAccount]);

  const mergeAndSortData = (data) => {
    const { open, close } = data;
    const combined = [...open, ...close];
    combined.sort((a, b) => b.betTime - a.betTime);
    return combined;
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (isConnected) {
      socket.on("LAST_RESULTS", (data) => {
        setDataSignal(data);
      });
    }
  }, [isConnected, socket]);

  useEffect(() => {
    if (isConnected && socket) {
      socket.on("ADD_OPEN_ORDER", (dataSocket) => {
        let dataTemp = data;
        let dataStatTemp = dataStat;
        const index = dataTemp?.findIndex(
          (item) => item.betTime === dataSocket.betTime && dataSocket.autoType === 4
        );
        if (index !== -1) {
          dataTemp[index] = dataSocket;
          const newObjData = {
            ...dataStatTemp,
            ...dataSocket.runningData,
            lastData: {
              ...dataStatTemp.lastData,
              longestWinStreak: dataSocket?.runningData?.longestWinStreak,
              longestLoseStreak: dataSocket?.runningData?.longestLoseStreak,
              winStreak: dataSocket?.runningData?.winStreak,
              loseStreak: dataSocket?.runningData?.loseStreak,
              victorStreak: data?.runningData?.victorStreak,
              longestVictorStreak: data?.runningData?.longestVictorStreak,
            },
          };
          setDataStat(newObjData);
        } else {
          const index = dataTemp?.find(
            (item) => item.betTime !== dataSocket.betTime && dataSocket.autoType === 4
          );
          if (index) {
            dataTemp = [dataSocket, ...dataTemp];
          }
        }
        setData(dataTemp);
      });
    }
  }, [isConnected, socket, data, dataStat]);

  useEffect(() => {
    if (isConnected && socket) {
      socket.on("ADD_CLOSE_ORDER", (dataSocket) => {
        let dataTemp = _.orderBy(data, "betTime", "desc");
        let dataStatTemp = dataStat;
        const index = dataTemp?.findIndex(
          (item) => item.betTime === dataSocket.betTime && dataSocket.autoType === 4
        );
        if (index !== -1) {
          dataTemp[index] = dataSocket;
          const newObjData = {
            ...dataStatTemp,
            ...dataSocket.runningData,
            lastData: {
              ...dataStatTemp.lastData,
              longestWinStreak: dataSocket?.runningData?.longestWinStreak,
              longestLoseStreak: dataSocket?.runningData?.longestLoseStreak,
              winStreak: dataSocket?.runningData?.winStreak,
              loseStreak: dataSocket?.runningData?.loseStreak,
              victorStreak: data?.runningData?.victorStreak,
              longestVictorStreak: data?.runningData?.longestVictorStreak,
            },
          };
          setDataStat(newObjData);
        } else {
          const index = dataTemp?.find(
            (item) => item.betTime !== dataSocket.betTime && dataSocket.autoType === 4
          );
          if (index) {
            dataTemp = [dataSocket, ...dataTemp];
          }
        }
        setData(dataTemp);
      });
    }
  }, [isConnected, socket, data, dataStat]);

  return (
    <ManualTradeContext.Provider
      value={{ dataSignal, setDataSignal, data, setData, dataStat, setDataStat, loading }}
    >
      {children}
    </ManualTradeContext.Provider>
  );
};

export default ManualTradeProvider;
