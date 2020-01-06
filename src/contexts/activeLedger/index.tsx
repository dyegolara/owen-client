import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { database } from "firebaseApi";
import useAuth from "hooks/useAuth";

const ActiveLedgerContext = React.createContext<ActiveLedgerType>({
  activeLedger: undefined,
  debts: [],
  ledgers: []
});

export const ActiveLedgerWrapper = (props: { children: JSX.Element }) => {
  const [activeLedger, setActiveLedger] = useState<Ledger | undefined>(
    undefined
  );
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
      const newActiveLedger = ledgers.find(
        ({ id }) => id === user.activeLedger
      );
      setActiveLedger(newActiveLedger);
    } else {
      createNewUser(userId);
    }
  };

  const addLedgersSuscription = () => {
    database.ref("ledgers").on("value", snapshot => {
      const dataValue = snapshot.val();
      if (dataValue) {
        const newLedgers = Object.entries(dataValue).map(([key, value]) => ({
          id: key,
          ...(value as Ledger)
        }));
        setLedgers(newLedgers);
      }
    });
  };

  const setDebtsList = () => {
    if (!activeLedger) return;
    const debtsList = Object.entries(activeLedger.debts)
      .map(([key, value]) => ({
        id: key,
        ...value,
        date: new Date(value.created).toLocaleDateString("es-MX")
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
    <ActiveLedgerContext.Provider value={value as ActiveLedgerType}>
      {props.children}
    </ActiveLedgerContext.Provider>
  );
};

ActiveLedgerWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ActiveLedgerContext;
