import React, { useState, useEffect } from 'react';
import { database } from '_firebase';

import AmountInput from 'components/Form/AmountInput';
import DescriptionInput from 'components/Form/DescriptionInput';
import Button from 'components/Button';
import useAuth from 'hooks/useAuth';
import LedgerShape from 'components/Ledgers/propTypes';

const Form = ({ activeLedger }) => {
  const { getUserInfo } = useAuth();
  const { userId } = getUserInfo();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [friendId, setFriendId] = useState('');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const getFriendId = () => {
    const { users } = activeLedger;
    const newFriendId = Object.keys(users).find(id => id !== userId);
    setFriendId(newFriendId);
  };

  const getOtherUserId = id => (id === userId ? friendId : userId);

  const handleAmountChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const toggleDescription = () => {
    setDescription('');
    setIsDescriptionOpen(current => !current);
  };

  const validateAmount = () => {
    setIsValid(+amount >= 1);
  };

  const updateTotal = (newDebt) => {
    const { id: activeLedgerId, total: { amount: currentDebt, to: currentOwner } } = activeLedger;

    const newAmount = currentOwner === newDebt.to // If the owner is the same,
      ? +currentDebt + newDebt.amount // add the amount to the debt
      : +currentDebt - newDebt.amount; // else, pay the amount to the debt

    const newTotal = {
      amount: Math.abs(newAmount),
      to: newAmount < 0 ? getOtherUserId(currentOwner) : currentOwner,
    };
    database.ref(`ledgers/${activeLedgerId}/total`).set(newTotal);
  };

  const createDebt = (to) => {
    if (!isValid) return;
    const newDebtId = database
      .ref()
      .child('ledgers')
      .child('debts')
      .push().key;

    const newDebt = {
      amount: +amount,
      completed: false,
      created: new Date().toISOString(),
      description,
      to,
    };

    database.ref(`ledgers/${activeLedger.id}/debts/${newDebtId}`).set(newDebt);
    updateTotal(newDebt);
    setAmount('');
  };

  useEffect(validateAmount, [amount]);
  useEffect(getFriendId, [activeLedger.id]);

  return (
    <div className='columns' style={{ padding: '1rem' }}>
      <div className='column is-2 is-offset-2'>
        <Button
          className='is-success is-large is-fullwidth'
          onClick={() => createDebt(userId)}
        >
          <span className='icon is-large'>
            <i className='mdi mdi-36px mdi-import' />
          </span>
        </Button>
      </div>
      <div className='column is-4 flex-column'>
        <AmountInput
          onChange={handleAmountChange}
          value={amount}
          isValid={isValid}
        />
        <DescriptionInput
          isOpen={isDescriptionOpen}
          onChange={handleDescriptionChange}
          value={description}
          toggleDescription={toggleDescription}
        />
      </div>
      <div className='column is-2'>
        <Button
          className='is-danger is-large is-fullwidth'
          onClick={() => createDebt(friendId)}
        >
          <span className='icon is-large'>
            <i className='mdi mdi-36px mdi-export' />
          </span>
        </Button>
      </div>
    </div>
  );
};

Form.propTypes = {
  activeLedger: LedgerShape.isRequired,
};

export default Form;
