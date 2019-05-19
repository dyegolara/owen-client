import React, { useState, useEffect } from 'react';
import { database } from '_firebase';

import Form from 'components/Form';
import Ledgers from 'components/Ledgers';
import Total from 'components/Total';
import SignOut from 'components/SignOut';
import useAuth from 'hooks/useAuth';

const Owen = () => {
  const [activeLedger, setActiveLedger] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const { getUserInfo } = useAuth();
  const { userId } = getUserInfo();

  const createNewUser = () => {
    const { userName, email } = getUserInfo();
    database.ref(`users/${userId}`).set({
      name: userName,
      email,
    });
  };

  const addLedgersSuscription = () => {
    database.ref('ledgers').on('value', (snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue) {
        const newLedgers = Object.keys(dataValue).map(key => ({
          ...dataValue[key],
          id: key,
        }));
        setLedgers(newLedgers);
      }
    });
  };

  const addActiveLedgerSuscription = () => {
    if (!userId || ledgers.length === 0) return;
    database
      .ref('users')
      .child(userId)
      .on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
          const newActiveLedger = ledgers.find(
            ({ id }) => id === user.activeLedger,
          );
          setActiveLedger(newActiveLedger);
        } else {
          createNewUser(userId);
        }
      });
  };

  useEffect(addLedgersSuscription, []);
  useEffect(addActiveLedgerSuscription, [ledgers, userId]);

  return (
    <div className='container' style={{ padding: '1rem' }}>
      <div className='flex-between'>
        <SignOut />
        <Ledgers activeLedger={activeLedger} ledgers={ledgers} />
      </div>
      {activeLedger && (
        <>
          <Total total={activeLedger.total} />
          <Form activeLedger={activeLedger} />
        </>
      )}
    </div>
  );
};

export default Owen;
