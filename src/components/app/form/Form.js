import React from 'react'
import Button from 'shared/button'

const AmountInput = ({ onChange, value, isValid }) => (
  <div className='field'>
    <p className='control has-icons-left'>
      <input
        className={`input is-large ${isValid ? '' : 'is-danger'}`}
        type='number'
        onChange={onChange}
        value={value}
        placeholder='0'
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

export default class Form extends React.Component {
  state = {
    amount: '',
    description: '',
    isDescriptionOpen: false,
    isValid: true
  }
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
  sendData = () => {
    if (this.validateAmount()) {
    }
  }
  render () {
    const { amount, description, isDescriptionOpen, isValid } = this.state
    return (
      <div className='columns'>
        <div className='column is-2 is-offset-2'>
          <Button
            className='is-success is-large is-fullwidth'
            onClick={this.sendData}
          >
            <span className='icon is-large'>
              <i className='mdi mdi-import' />
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
          <div className='flex-center flex-column'>
            <a onClick={this.toggleDescription}>
              <span className='icon'>
                <i
                  className={`mdi ${
                    isDescriptionOpen ? 'mdi-close' : 'mdi-plus'
                  }`}
                />
              </span>
              <span>
                {isDescriptionOpen ? 'Cancelar' : 'Agregar descripción'}
              </span>
            </a>
            <textarea
              rows={3}
              className={`textarea ${isDescriptionOpen ? '' : 'is-hidden'}`}
              onChange={e => {
                this.handleInputChange('description', e.currentTarget.value)
              }}
              value={description}
            />
          </div>
        </div>
        <div className='column is-2'>
          <Button className='is-danger is-large is-fullwidth'>
            <span className='icon is-large'>
              <i className='mdi mdi-export' />
            </span>
          </Button>
        </div>
      </div>
    )
  }
}
