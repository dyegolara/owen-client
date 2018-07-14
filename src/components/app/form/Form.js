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
        <div className='column is-2 is-offset-2'>
          <Button className='is-success is-large is-fullwidth'>
            <span className='icon is-large'>
              <i className='mdi mdi-import' />
            </span>
          </Button>
        </div>
        <div className='column is-4 flex-column'>
          <input
            className='input is-large'
            type='number'
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
          <div className='flex-between'>
            <a>
              <span className='icon'>
                <i className='mdi mdi-plus' />
              </span>
              <span>Agregar descripción</span>
            </a>
            <a>
              <span className='icon'>
                <i className='mdi mdi-camera' />
              </span>
              <span>Agregar foto</span>
            </a>
          </div>
        </div>
        <div className='column is-2'>
          <Button className='is-danger is-large is-fullwidth' icon='export' />
        </div>
      </div>
    )
  }
}
