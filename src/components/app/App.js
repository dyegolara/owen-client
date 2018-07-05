import React from 'react'
import styles from './App.module.scss'
import { auth, database } from '../../firebase'

import Menu from 'shared/menu'
import Button from 'shared/button'

const ROUTES = [
  {
    id: 'history',
    label: 'Historial',
    route: '/history',
    icon: 'mdi-history'
  },
  {
    id: 'inicio',
    label: 'Inicio',
    route: '/',
    icon: 'mdi-home'
  }
]

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
        <div className={styles.content}>
          <Button onClick={this.signOut}>Desloguearse</Button>
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
        <Menu routes={ROUTES} />
      </div>
    )
  }
}
