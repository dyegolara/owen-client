import React from 'react'
import { auth, database } from '_firebase'

import AppStorage from 'appStorage'
import Button from 'shared/button'
import Form from 'components/app/form'
import Ledgers from 'components/app/ledgers'
import Total from 'components/app/total'

export default class App extends React.Component {
  userId = AppStorage.getUserId()
  userName = AppStorage.getUserName()
  email = AppStorage.getEmail()
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
    database
      .ref('users')
      .child(this.userId)
      .on('value', snapshot => {
        const user = snapshot.val()
        if (user) {
          const activeLedger = this.state.ledgers.find(
            ({ id }) => id === user.activeLedger
          )
          this.setState({ activeLedger })
        } else {
          this.createNewUser(this.userId)
        }
      })
  }
  createNewUser = userId => {
    database.ref('users/' + userId).set({
      name: this.userName,
      email: this.email
    })
  }
  setUset = user => {
    this.setState({ user })
  }
  signOut = () => {
    auth.signOut()
  }
  render () {
    const { activeLedger, ledgers } = this.state
    return (
      <div className='container'>
        <div className='flex-between'>
          <Button
            onClick={this.signOut}
            icon='logout'
            ariaLabel='Cerrar Sesión'
          />
          <Ledgers activeLedger={activeLedger} ledgers={ledgers} />
        </div>
        {activeLedger && <Total total={activeLedger.total} />}
        {activeLedger && <Form />}
      </div>
    )
  }
}
