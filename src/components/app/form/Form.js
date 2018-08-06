import React from 'react'

import AppStorage from 'appStorage'
import Button from 'shared/button'
import { database } from '_firebase'

const AmountInput = ({ onChange, value, isValid }) => (
  <div className='field'>
    <p className='control has-icons-left'>
      <input
        className={`input is-large ${isValid ? '' : 'is-danger'}`}
        type='number'
        onChange={onChange}
        value={value}
        placeholder='0'
        //  style={{textAlign: 'right'}}
      />
      <span className='icon is-left'>
        <i className='mdi mdi-currency-usd' />
      </span>
    </p>
    {isValid || (
      <p className='help is-danger'>La cantidad debe ser mayor a 0</p>
    )}
  </div>
)

const DescriptionInput = ({ isOpen, value, onChange, toggleDescription }) => (
  <div className='field'>
    <div className={`control has-text-centered `}>
      <a
        onClick={toggleDescription}
        className={isOpen ? 'has-text-danger' : ''}
      >
        <span className='icon'>
          <i className={`mdi ${isOpen ? 'mdi-close' : 'mdi-plus'}`} />
        </span>
        <span>{isOpen ? 'Cancelar' : 'Agregar descripción'}</span>
      </a>
    </div>
    <div className='control'>
      <textarea
        rows={3}
        className={`textarea ${isOpen ? '' : 'is-hidden'}`}
        onChange={onChange}
        value={value}
        style={{ marginTop: '0.5rem' }}
        placeholder='Descripción'
      />
    </div>
  </div>
)

export default class Form extends React.Component {
  userId = AppStorage.getUserId()
  state = {
    amount: '',
    description: '',
    isDescriptionOpen: false,
    isValid: true
  }
  getFriendId = () =>
    Object.keys(this.props.activeLedger.users).find(id => id !== this.userId)
  getOtherUserId = userId =>
    userId === this.userId ? this.getFriendId() : this.userId
  handleInputChange = (key, value) => {
    this.setState({ [key]: value })
  }
  toggleDescription = () => {
    this.setState(({ isDescriptionOpen }) => ({
      description: '',
      isDescriptionOpen: !isDescriptionOpen
    }))
  }
  validateAmount = () => {
    const isValid = +this.state.amount >= 1
    this.setState({ isValid })
    return isValid
  }
  createDebt = to => {
    const { amount, description } = this.state
    const { activeLedger } = this.props
    if (!this.validateAmount()) return
    const newDebtId = database
      .ref()
      .child('ledgers')
      .child('debts')
      .push().key

    const newDebt = {
      amount: +amount,
      completed: false,
      created: new Date().toISOString(),
      description,
      to
    }

    database.ref(`ledgers/${activeLedger.id}/debts/${newDebtId}`).set(newDebt)
    this.updateTotal(newDebt)
  }
  updateTotal = newDebt => {
    const { id, total } = this.props.activeLedger
    const amount =
      total.to === newDebt.to
        ? +total.amount + newDebt.amount
        : +total.amount - newDebt.amount
    const to = amount < 0 ? this.getOtherUserId(total.to) : total.to
    const newTotal = {
      amount: Math.abs(amount),
      to
    }
    database.ref(`ledgers/${id}/total`).set(newTotal)
  }
  render () {
    const { amount, description, isDescriptionOpen, isValid } = this.state
    return (
      <div className='columns'>
        <div className='column is-2 is-offset-2'>
          <Button
            className='is-success is-large is-fullwidth'
            onClick={() => {
              this.createDebt(this.userId)
            }}
          >
            <span className='icon is-large'>
              <i className='mdi mdi-36px mdi-import' />
            </span>
          </Button>
        </div>
        <div className='column is-4 flex-column'>
          <AmountInput
            onChange={e => {
              this.handleInputChange('amount', e.currentTarget.value)
            }}
            value={amount}
            isValid={isValid}
          />
          <DescriptionInput
            isOpen={isDescriptionOpen}
            onChange={e => {
              this.handleInputChange('description', e.currentTarget.value)
            }}
            value={description}
            toggleDescription={this.toggleDescription}
          />
        </div>
        <div className='column is-2'>
          <Button
            className='is-danger is-large is-fullwidth'
            onClick={() => {
              this.createDebt(this.getFriendId())
            }}
          >
            <span className='icon is-large'>
              <i className='mdi mdi-36px mdi-export' />
            </span>
          </Button>
        </div>
      </div>
    )
  }
}
