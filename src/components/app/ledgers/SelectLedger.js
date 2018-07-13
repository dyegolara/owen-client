import React from 'react'
import { database } from '_firebase'

export default class SelectLedger extends React.Component {
  state = {
    isActive: false
  }
  toggleDropdown = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }))
  }
  setActiveLedger = ledgerId => {
    database.ref('users/' + this.props.userId).update({
      activeLedger: ledgerId
    })
  }
  render () {
    const { isActive } = this.state
    const { ledgers, userId } = this.props
    return (
      <div className={`dropdown ${isActive ? 'is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            onClick={this.toggleDropdown}
            className='button'
            aria-haspopup='true'
            aria-controls='dropdown-menu'
          >
            <span>Ledgers</span>
            <span className='icon is-small'>
              <i className='mdi mdi-angle-down' aria-hidden='true' />
            </span>
          </button>
        </div>

        <div className='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            {ledgers.length > 0 &&
              ledgers.map(ledger => {
                const userIds = Object.keys(ledger.users)
                const friendId = userIds.find(id => id !== userId)
                const friendName = ledger.users[friendId]
                return (
                  <a
                    key={friendId}
                    className='dropdown-item'
                    onClick={() => {
                      this.setActiveLedger(ledger.id)
                    }}
                  >
                    {friendName}
                  </a>
                )
              })}
            <hr className='dropdown-divider' />
          </div>
        </div>
      </div>
    )
  }
}
