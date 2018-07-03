import React from 'react'
import styles from './App.scss'

export default class App extends React.Component {
  state = {
    data: null
  }
  render () {
    return (
      <div className={styles.wrapper}>
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
