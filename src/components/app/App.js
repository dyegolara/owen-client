import React from 'react'
import styles from './App.module.scss'
import { auth, database } from '_firebase'

import Menu from 'shared/menu'
import Button from 'shared/button'
import Ledgers from 'components/app/ledgers'

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
          <div className='flex-between'>
            <div />
            <Ledgers />
            <Button
              onClick={this.signOut}
              icon='logout'
              ariaLabel='Cerrar Sesión'
            />
          </div>
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
