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
          <div class='dropdown-trigger'>
            <button
              class='button'
              aria-haspopup='true'
              aria-controls='dropdown-menu'
            >
              <span>Ledgers</span>
              <span class='icon is-small'>
                <i class='mdi mdi-angle-down' aria-hidden='true' />
              </span>
            </button>
          </div>

          <div class='dropdown-menu' id='dropdown-menu' role='menu'>
            <div class='dropdown-content'>
              <a href='#' class='dropdown-item'>
                Dropdown item
              </a>
              <a class='dropdown-item'>Other dropdown item</a>
              <a href='#' class='dropdown-item is-active'>
                Active dropdown item
              </a>
              <a href='#' class='dropdown-item'>
                Other dropdown item
              </a>
              <hr class='dropdown-divider' />
              <a href='#' class='dropdown-item'>
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
