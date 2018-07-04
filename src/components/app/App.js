import React from 'react'
import styles from './App.scss'
import { auth, database } from '../../firebase'

export default class App extends React.Component {
  state = {
    data: null
  }
  componentDidMount () {
    database.ref().on('value', () => {})
  }
  signOut = () => {
    auth.signOut()
  }
  render () {
    return (
      <div className={styles.wrapper}>
        <button onClick={this.signOut}>Desloguearse</button>
        <div className='columns'>
          <div className='column'>Seleccionar una </div>
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
