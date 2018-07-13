import React from 'react'
import { auth, database } from '_firebase'

import Button from 'shared/button'
import Ledgers from 'components/app/ledgers'

export default class App extends React.Component {
  state = {
    activeLedger: null,
    ledgers: []
  }
  componentDidMount () {
    this.addLedgersSuscription()
  }
  addLedgersSuscription () {
    database.ref('ledgers').on('value', snapshot => {
      const dataValue = snapshot.val()
      if (dataValue) {
        const ledgers = Object.keys(dataValue).map(key => ({
          ...dataValue[key],
          id: key
        }))
        this.setState({ ledgers }, () => {
          this.addActiveLedgerSuscription()
        })
      }
    })
  }
  addActiveLedgerSuscription = () => {
    const { userId } = this.props
    database
      .ref('users')
      .child(userId)
      .on('value', snapshot => {
        const user = snapshot.val()
        const activeLedger = this.state.ledgers.find(
          ({ id }) => id === user.activeLedger
        )
        user ? this.setState({ activeLedger }) : this.createNewUser(userId)
      })
  }
  createNewUser = userId => {
    database.ref('users/' + userId).set({
      name: this.props.userName,
      email: this.props.email
    })
  }
  setUset = user => {
    this.setState({ user })
  }
  signOut = () => {
    auth.signOut()
  }
  render () {
    const { userId, userName } = this.props
    const { activeLedger, ledgers } = this.state
    return (
      <div className='container'>
        <div className='flex-between'>
          <Button
            onClick={this.signOut}
            icon='logout'
            ariaLabel='Cerrar Sesión'
          />
          <Ledgers
            activeLedger={activeLedger}
            ledgers={ledgers}
            userId={userId}
            userName={userName}
          />
        </div>
        <div className='columns'>
          <div className='column'>Me deben</div>
          <div className='column'>Input</div>
          <div className='column'>Debo</div>
        </div>
      </div>
    )
  }
}
