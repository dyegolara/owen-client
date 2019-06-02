import { useContext } from 'react';
import ActiveLedgerContext from 'contexts/activeLedger';

const useActiveLedger = () => useContext(ActiveLedgerContext);

export default useActiveLedger;
