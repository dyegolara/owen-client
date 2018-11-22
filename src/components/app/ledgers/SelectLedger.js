import React from 'react'
import PropTypes from 'prop-types'
import { database } from '_firebase'

import AppStorage from 'appStorage'
import LedgerShape from 'shared/propTypes/ledger'

export default class SelectLedger extends React.PureComponent {
  static propTypes = {
    activeLedger: LedgerShape,
    ledgers: PropTypes.arrayOf(LedgerShape).isRequired
  }
  static defaultProps = {
    activeLedger: null
  }
  userId = AppStorage.getUserId()
  state = {
    isActive: false
  }
  toggleDropdown = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }))
  }
  setActiveLedger = ledgerId => {
    this.toggleDropdown()
    database.ref('users/' + this.userId).update({
      activeLedger: ledgerId
    })
  }
  getFriendName = (ledgers, ledger) => {
    if (ledgers.length === 0 || !ledger) return ''
    const friendId = Object.keys(ledger.users).find(id => id !== this.userId)
    return ledger.users[friendId]
  }
  render () {
    const { isActive } = this.state
    const { activeLedger, ledgers } = this.props
    const activeFriendName = this.getFriendName(ledgers, activeLedger)
    return (
      <div className={`dropdown ${isActive ? 'is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            onClick={this.toggleDropdown}
            className='button'
            aria-haspopup='true'
            aria-controls='dropdown-menu'
          >
            <span>{activeFriendName || 'Amigos'}</span>
            <span className='icon is-small'>
              <i className='mdi mdi-angle-down' aria-hidden='true' />
            </span>
          </button>
        </div>
        <div className='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            {ledgers.length > 0 &&
              ledgers.map(ledger => (
                <a
                  key={ledger.id}
                  className='dropdown-item'
                  onClick={() => {
                    this.setActiveLedger(ledger.id)
                  }}
                >
                  {this.getFriendName(ledgers, ledger)}
                </a>
              ))}
            <hr className='dropdown-divider' />
          </div>
        </div>
      </div>
    )
  }
}
