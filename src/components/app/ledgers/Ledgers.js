import React from 'react'
import { database } from '_firebase'
import NewLedger from './NewLedger'

export default class Ledgers extends React.Component {
  dataRef = database.ref('/ledgers')
  componentDidMount () {
    this.dataRef.on('value', value => {
      console.log({ value })
    })
  }
  render () {
    return (
      <div>
        <div className='dropdown'>
          <div className='dropdown-trigger'>
            <button
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
              <a href='#' className='dropdown-item'>
                Dropdown item
              </a>
              <a className='dropdown-item'>Other dropdown item</a>
              <a href='#' className='dropdown-item'>
                Active dropdown item
              </a>
              <a href='#' className='dropdown-item'>
                Other dropdown item
              </a>
              <hr className='dropdown-divider' />
              <a href='#' className='dropdown-item'>
                With a divider
              </a>
            </div>
          </div>
        </div>
        <NewLedger />
      </div>
    )
  }
}
