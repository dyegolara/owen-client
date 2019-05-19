import React from 'react';
import uuid from 'uuid';
import Button from 'shared/button';
import Modal from 'shared/modal';
import { database } from '_firebase';
import AppStorage from 'appStorage';

export default class NewLedger extends React.Component {
  state = {
    friendName: '',
    modalOpen: false,
  }

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  }

  handleSubmit = () => {
    const userId = AppStorage.getUserId();
    const userName = AppStorage.getUserName();
    const { friendName } = this.state;
    const userRef = database.ref(`users/${userId}`);
    const newLedgerId = database
      .ref()
      .child('ledgers')
      .push().key;
    database.ref(`ledgers/${newLedgerId}`).set({
      color: '#5f7eaf',
      users: {
        [userId]: userName,
        [uuid()]: friendName,
      },
      modified: new Date().toISOString(),
      total: {
        amount: 0,
        to: userId,
      },
    });
    userRef.child(`ledgers/${newLedgerId}`).set(true);
    userRef.child('activeLedger').set(newLedgerId);
  }

  renderForm = () => {
    const { friendName } = this.state;
    return (
      <form>
        <p>Color Picker</p>
        <p>Anonymous ? friendName : friendEmail</p>
        <div className='field'>
          <label className='label' htmlFor='newLedger'>
            <span>Nombre de tu amigo</span>
            <div className='control has-icons-left'>
              <input
                id='newLedger'
                type='text'
                className='input'
                value={friendName}
                onChange={(e) => {
                  this.handleChange(e.currentTarget.value, 'friendName');
                }}
              />
              <span className='icon is-small is-left'>
                <i className='mdi mdi-account' />
              </span>
            </div>
          </label>
        </div>
      </form>
    );
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <React.Fragment>
        <Button icon='plus' onClick={this.toggleModal} />
        <Modal
          title='Agregar Ledger'
          isActive={modalOpen}
          toggleModal={this.toggleModal}
          onSubmit={this.handleSubmit}
        >
          {this.renderForm()}
        </Modal>
      </React.Fragment>
    );
  }
}
