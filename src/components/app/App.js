import React from 'react'
import { auth, database } from '_firebase'

import Button from 'shared/button'
import Ledgers from 'components/app/ledgers'

export default class App extends React.Component {
  state = {
    user: null
  }
  componentDidMount () {
    const { userId } = this.props
    database
      .ref('users')
      .child(userId)
      .on('value', snapshot => {
        const user = snapshot.val()
        user
          ? this.setState({ activeLedger: user.activeLedger })
          : this.createNewUser(userId)
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
    const { activeLedger } = this.state
    return (
      <div className='container'>
        <div className='flex-between'>
          <div />
          <Ledgers
            activeLedger={activeLedger}
            userId={userId}
            userName={userName}
          />
          <Button
            onClick={this.signOut}
            icon='logout'
            ariaLabel='Cerrar Sesión'
          />
        </div>
        <div className='columns'>
          <div className='column'>Total</div>
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
