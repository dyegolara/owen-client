import React, { useState, useEffect } from "react";
import { entries } from "lodash";
import { database } from "firebaseApi";
import useAuth from "hooks/useAuth";
import { IActiveLedger, Ledger, Debt } from "types";

const defaultLedger = {
  color: "",
  id: "",
  modified: "",
  total: {
    amount: 0,
    to: ""
  },
  users: {},
  debts: {}
};

const ActiveLedgerContext = React.createContext<IActiveLedger>({
  activeLedger: defaultLedger,
  debts: [],
  ledgers: []
});

export const ActiveLedgerWrapper = (props: { children: React.ReactNode }) => {
  const [activeLedger, setActiveLedger] = useState<Ledger>(defaultLedger);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const { getUserInfo } = useAuth();
  const { userId } = getUserInfo();

  const createNewUser = (userId: string) => {
    const { userName, email } = getUserInfo();
    database.ref(`users/${userId}`).set({
      name: userName,
      email
    });
  };

  const handleActiveLedgerChange = (snapshot: any) => {
    const user = snapshot.val();
    if (user) {
      const newActiveLedger =
        ledgers.find(({ id }) => id === user.activeLedger) || defaultLedger;
      setActiveLedger(newActiveLedger);
    } else {
      createNewUser(userId);
    }
  };

  const addLedgersSuscription = () => {
    database.ref("ledgers").on("value", snapshot => {
      const dataValue = snapshot.val();
      if (dataValue) {
        const newLedgers = entries(dataValue).map(([key, value]) => ({
          id: key,
          ...(value as Ledger)
        }));
        setLedgers(newLedgers);
      }
    });
  };

  const setDebtsList = (): void => {
    if (!activeLedger) {
      return;
    }
    const debtsList: Debt[] = entries(activeLedger.debts)
      .map(([key, value]: [string, any]) => ({
        id: key,
        date: new Date(value.created).toLocaleDateString("es-MX"),
        ...value
      }))
      .sort((a, b) => +new Date(b.created) - +new Date(a.created));
    setDebts(debtsList);
  };

  const addActiveLedgerSuscription = () => {
    if (!userId || ledgers.length === 0) return;
    database
      .ref("users")
      .child(userId)
      .on("value", handleActiveLedgerChange);
  };

  useEffect(addLedgersSuscription, []);
  useEffect(addActiveLedgerSuscription, [ledgers, userId]);
  useEffect(setDebtsList, [activeLedger]);

  const value = { activeLedger, debts, ledgers };
  return (
    <ActiveLedgerContext.Provider value={value as IActiveLedger}>
      {props.children}
    </ActiveLedgerContext.Provider>
  );
};

export default ActiveLedgerContext;
