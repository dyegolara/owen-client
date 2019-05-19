import React from 'react';
import PropTypes from 'prop-types';
import { database } from '_firebase';

import AppStorage from 'appStorage';
import AmountInput from 'components/app/form/AmountInput';
import DescriptionInput from 'components/app/form/DescriptionInput';
import Button from 'shared/button';

export default class Form extends React.Component {
  userId = AppStorage.getUserId()

  state = {
    amount: '',
    description: '',
    isDescriptionOpen: false,
    isValid: true,
  }

  getFriendId = () => {
    const { activeLedger: { users } } = this.props;
    Object.keys(users).find(id => id !== this.userId);
  }

  getOtherUserId = userId => (userId === this.userId ? this.getFriendId() : this.userId)

  handleInputChange = (key, value) => {
    this.setState({ [key]: value });
  }

  toggleDescription = () => {
    this.setState(({ isDescriptionOpen }) => ({
      description: '',
      isDescriptionOpen: !isDescriptionOpen,
    }));
  }

  validateAmount = () => {
    const { amount } = this.state;
    const isValid = +amount >= 1;
    this.setState({ isValid });
    return isValid;
  }

  createDebt = (to) => {
    const { amount, description } = this.state;
    const { activeLedger } = this.props;
    if (!this.validateAmount()) return;
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
    this.updateTotal(newDebt);
  }

  updateTotal = (newDebt) => {
    const { activeLedger: { id, total } } = this.props;
    const amount = total.to === newDebt.to
      ? +total.amount + newDebt.amount
      : +total.amount - newDebt.amount;
    const to = amount < 0 ? this.getOtherUserId(total.to) : total.to;
    const newTotal = {
      amount: Math.abs(amount),
      to,
    };
    database.ref(`ledgers/${id}/total`).set(newTotal);
  }

  render() {
    const {
      amount, description, isDescriptionOpen, isValid,
    } = this.state;
    return (
      <div className='columns'>
        <div className='column is-2 is-offset-2'>
          <Button
            className='is-success is-large is-fullwidth'
            onClick={() => {
              this.createDebt(this.userId);
            }}
          >
            <span className='icon is-large'>
              <i className='mdi mdi-36px mdi-import' />
            </span>
          </Button>
        </div>
        <div className='column is-4 flex-column'>
          <AmountInput
            onChange={(e) => {
              this.handleInputChange('amount', e.currentTarget.value);
            }}
            value={amount}
            isValid={isValid}
          />
          <DescriptionInput
            isOpen={isDescriptionOpen}
            onChange={(e) => {
              this.handleInputChange('description', e.currentTarget.value);
            }}
            value={description}
            toggleDescription={this.toggleDescription}
          />
        </div>
        <div className='column is-2'>
          <Button
            className='is-danger is-large is-fullwidth'
            onClick={() => {
              this.createDebt(this.getFriendId());
            }}
          >
            <span className='icon is-large'>
              <i className='mdi mdi-36px mdi-export' />
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  activeLedger: PropTypes.shape({
    id: PropTypes.string,
    total: PropTypes.string,
    users: PropTypes.array,
  }).isRequired,
};
