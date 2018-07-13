import React from 'react'
import { database } from '_firebase'

import NewLedger from './NewLedger'
import SelectLedger from './SelectLedger'

export default class Ledgers extends React.Component {
  state = {
    ledgers: []
  }
  dataRef = database.ref('/ledgers')
  componentDidMount () {
    this.dataRef.on('value', snapshot => {
      const dataValue = snapshot.val()
      const ledgers = Object.keys(dataValue).map(key => ({
        ...dataValue[key],
        id: key
      }))
      this.setState({ ledgers })
    })
  }
  render () {
    const { userId, userName } = this.props
    const { ledgers } = this.state
    console.log({ ledgers })
    return (
      <div>
        <SelectLedger userId={userId} ledgers={ledgers} />
        <NewLedger userId={userId} userName={userName} />
      </div>
    )
  }
}
