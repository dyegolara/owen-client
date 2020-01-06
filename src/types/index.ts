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
export interface IAuthContext {
  login: () => void;
  sessionStatus: string;
  getUserInfo: () => UserInfo;
  ACTIVE: string;
  LOADING: string;
  INACTIVE: string;
}

export type NewDebt = {
  amount: number;
  completed: boolean;
  created: string;
  description: string;
  to: string;
};
export type Debt = NewDebt & {
  id: string;
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
export interface IActiveLedger {
  activeLedger: Ledger | undefined;
  debts: Debt[];
  ledgers: Ledger[];
}
