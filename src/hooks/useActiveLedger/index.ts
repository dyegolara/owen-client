import { useContext } from "react";
import ActiveLedgerContext from "contexts/activeLedger";
import { IActiveLedger } from "types";

function useActiveLedger(): IActiveLedger {
  return useContext(ActiveLedgerContext);
}

export default useActiveLedger;
