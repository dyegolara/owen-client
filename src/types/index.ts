export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
};
export type UserInfo = {
  userId: string;
  email: string;
  userName: string;
};
export interface AuthContextType {
  login: () => void;
  sessionStatus: string;
  getUserInfo: () => UserInfo;
  ACTIVE: string;
  LOADING: string;
  INACTIVE: string;
}

export type Debt = {
  id: string;
  amount: number;
  completed: boolean;
  created: string;
  description: string;
  to: string;
  date: string;
};
export type Ledger = {
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
export interface ActiveLedgerType {
  activeLedger: Ledger | undefined;
  debts: Debt[];
  ledgers: Ledger[];
}