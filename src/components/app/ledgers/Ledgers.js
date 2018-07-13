import React from 'react'

import NewLedger from './NewLedger'
import SelectLedger from './SelectLedger'

const Ledgers = ({ activeLedger, userId, userName, ledgers }) => (
  <React.Fragment>
    <SelectLedger
      activeLedger={activeLedger}
      ledgers={ledgers}
      userId={userId}
    />
    <NewLedger userId={userId} userName={userName} />
  </React.Fragment>
)

export default Ledgers
