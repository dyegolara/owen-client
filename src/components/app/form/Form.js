import React from 'react'
import Button from 'shared/button'

export default class Form extends React.Component {
  state = {
    amount: 0
  }
  handleAmountChange = e => {
    const { value } = e.currentTarget
    this.setState({ amount: value })
  }
  render () {
    return (
      <div className='columns'>
        <div className='column is-2 is-offset-3'>
          <Button className='is-medium is-fullwidth'>Me deben</Button>
        </div>
        <div className='column is-2'>
          <input
            className='input is-medium'
            type='number'
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
        </div>
        <div className='column is-2'>
          <Button className='is-medium is-fullwidth'>Debo</Button>
        </div>
      </div>
    )
  }
}
