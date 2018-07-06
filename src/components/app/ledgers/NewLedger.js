import React from 'react'
import Button from 'shared/button'
import Modal from 'shared/modal'

export default class NewLedger extends React.Component {
  state = {
    modalOpen: false
  }
  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }))
  }
  render () {
    return (
      <React.Fragment>
        <Button icon='plus' onClick={this.toggleModal} />
        <Modal isActive={this.state.modalOpen} toggleModal={this.toggleModal}>
          Hola
        </Modal>
      </React.Fragment>
    )
  }
}
