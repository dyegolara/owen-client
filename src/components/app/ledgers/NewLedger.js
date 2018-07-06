import React from 'react'
import Button from 'shared/button'
import Modal from 'shared/modal'
import { database } from '_firebase'

export default class NewLedger extends React.Component {
  state = {
    friendEmail: '',
    friendName: '',
    modalOpen: false
  }
  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }))
  }
  handleChange = (value, key) => {
    this.setState({ [key]: value })
  }
  handleSubmit = () => {
    const { userId, userName } = this.props
    const { friendName } = this.state
    const newLedgerKey = database
      .ref()
      .child('ledgers')
      .push().key
    console.log(newLedgerKey)
    database.ref('ledgers/' + newLedgerKey).set({
      color: '#5f7eaf',
      users: {
        [userId]: userName,
        anonymous: friendName
      },
      modified: 'Date'
    })
  }
  renderForm = () => {
    const { friendName } = this.state
    return (
      <form>
        <p>Color Picker</p>
        <p>Anonymous ? 'friendName' : 'friendEmail'</p>
        <p className='field'>
          <label className='label'>Nombre de tu amigo</label>
          <div className='control has-icons-left'>
            <input
              type='text'
              className='input'
              value={friendName}
              onChange={e => {
                this.handleChange(e.currentTarget.value, 'friendName')
              }}
            />
            <span className='icon is-small is-left'>
              <i className='mdi mdi-account' />
            </span>
          </div>
        </p>
      </form>
    )
  }
  render () {
    return (
      <React.Fragment>
        <Button icon='plus' onClick={this.toggleModal} />
        <Modal
          title='Agregar Ledger'
          isActive={this.state.modalOpen}
          toggleModal={this.toggleModal}
          onSubmit={this.handleSubmit}
        >
          {this.renderForm()}
        </Modal>
      </React.Fragment>
    )
  }
}
