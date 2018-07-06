import React from 'react'
import { database } from '_firebase'
import NewLedger from './NewLedger'

export default class Ledgers extends React.Component {
  state = {
    dropdownOpen: false,
    ledgers: []
  }
  dataRef = database.ref('/ledgers')
  componentDidMount () {
    this.dataRef.on('value', snapshot => {
      const dataValue = snapshot.val()
      const ledgers = Object.keys(dataValue).map(key => dataValue[key])
      this.setState({ ledgers })
    })
  }
  toggleDropdown = () => {
    this.setState(({ dropdownOpen }) => ({ dropdownOpen: !dropdownOpen }))
  }
  render () {
    const { userId, userName } = this.props
    const { dropdownOpen, ledgers } = this.state
    console.log({ ledgers })
    return (
      <div>
        <div className={`dropdown ${dropdownOpen ? 'is-active' : ''}`}>
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
                    <a key={friendId} className='dropdown-item'>
                      {friendName}
                    </a>
                  )
                })}
              <hr className='dropdown-divider' />
            </div>
          </div>
        </div>
        <NewLedger userId={userId} userName={userName} />
      </div>
    )
  }
}
