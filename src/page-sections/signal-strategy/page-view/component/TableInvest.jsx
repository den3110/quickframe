import HistoryTable from 'page-sections/manual-trade/section/HistoryTable'
import React, { memo } from 'react'

const TableInvest = () => {
  return (
    <HistoryTable isFromTeleChannel={true} />
  )
}

export default memo(TableInvest)
