import { useContext } from "react";
import ActiveLedgerContext from "contexts/activeLedger";

type Debt = {
  amount: number;
  created: string;
  date: string;
  id: string;
  to: string;
  description?: string;
  completed?: boolean;
};
type Ledger = {
  color: string;
  id: string;
  modified: string;
  total: {
    amount: number;
    to: string;
  };
  users: object;
  debts: object;
};
interface ActiveLedgerType {
  activeLedger: Ledger | undefined;
  debts: Debt[];
  ledgers: Ledger[];
}

function useActiveLedger(): ActiveLedgerType {
  return useContext(ActiveLedgerContext);
}

export default useActiveLedger;
