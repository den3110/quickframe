import React from 'react'
import { createContext } from 'react'

export const ManualTradeContext= createContext()
const ManualTradeProvider = ({children}) => {
  return (
    <ManualTradeContext.Provider value={{}}>
      {children}
    </ManualTradeContext.Provider>
  )
}

export default ManualTradeProvider
