import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { database } from "firebaseApi";

import useAuth from "hooks/useAuth";

const ActiveLedgerContext = React.createContext({});

export const ActiveLedgerWrapper = ({ children }) => {
  const [activeLedger, setActiveLedger] = useState(null);
  const [debts, setDebts] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const { getUserInfo } = useAuth();
  const { userId } = getUserInfo();

  const createNewUser = () => {
    const { userName, email } = getUserInfo();
    database.ref(`users/${userId}`).set({
      name: userName,
      email
    });
  };

  const handleActiveLedgerChange = snapshot => {
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
          ...value
        }));
        setLedgers(newLedgers);
      }
    });
  };

  const addActiveLedgerSuscription = () => {
    if (!userId || ledgers.length === 0) return;
    database
      .ref("users")
      .child(userId)
      .on("value", handleActiveLedgerChange);
  };

  const setDebtsList = () => {
    if (!activeLedger) return;
    const debtsList = Object.entries(activeLedger.debts)
      .map(([key, value]) => ({
        id: key,
        ...value,
        date: new Date(value.created).toLocaleDateString("es-MX")
      }))
      .sort((a, b) => new Date(b.created) - new Date(a.created));
    setDebts(debtsList);
  };

  useEffect(addLedgersSuscription, []);
  useEffect(addActiveLedgerSuscription, [ledgers, userId]);
  useEffect(setDebtsList, [activeLedger]);

  return (
    <ActiveLedgerContext.Provider value={{ activeLedger, debts, ledgers }}>
      {children}
    </ActiveLedgerContext.Provider>
  );
};

ActiveLedgerWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ActiveLedgerContext;
