import React from 'react'
import { auth, database } from '_firebase'

import Button from 'shared/button'
import Ledgers from 'components/app/ledgers'

export default class App extends React.Component {
  state = {
    data: null
  }
  componentDidMount () {
    const { userId } = this.props
    database
      .ref('users')
      .child(userId)
      .on('value', snapshot => {
        const dataValue = snapshot.val()
        dataValue ? console.log({ dataValue }) : this.createNewUser(userId)
      })
  }
  createNewUser (userId) {
    database.ref('users/' + userId).set({
      name: this.props.userName,
      email: this.props.email
    })
  }
  signOut = () => {
    auth.signOut()
  }
  render () {
    const { userId, userName } = this.props
    return (
      <div className='container'>
        <div className='flex-between'>
          <div />
          <Ledgers userId={userId} userName={userName} />
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
