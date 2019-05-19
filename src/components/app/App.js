import React from 'react';
import { database } from '_firebase';

import AppStorage from 'appStorage';
import Form from 'components/app/form';
import Ledgers from 'components/app/ledgers';
import Total from 'components/app/total';
import SignOut from 'components/app/signOut';

export default class App extends React.Component {
  userId = AppStorage.getUserId()

  userName = AppStorage.getUserName()

  email = AppStorage.getEmail()

  state = {
    activeLedger: null,
    ledgers: [],
  }

  componentDidMount() {
    this.addLedgersSuscription();
  }

  addLedgersSuscription = () => {
    database.ref('ledgers').on('value', (snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue) {
        const ledgers = Object.keys(dataValue).map(key => ({
          ...dataValue[key],
          id: key,
        }));
        this.setState({ ledgers }, this.addActiveLedgerSuscription);
      }
    });
  }

  addActiveLedgerSuscription = () => {
    const { ledgers } = this.state;
    database
      .ref('users')
      .child(this.userId)
      .on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
          const activeLedger = ledgers.find(
            ({ id }) => id === user.activeLedger,
          );
          this.setState({ activeLedger });
        } else {
          this.createNewUser(this.userId);
        }
      });
  }

  createNewUser = (userId) => {
    database.ref(`users/${userId}`).set({
      name: this.userName,
      email: this.email,
    });
  }

  render() {
    const { activeLedger, ledgers } = this.state;
    return (
      <div className='container' style={{ padding: '1rem' }}>
        <div className='flex-between'>
          <SignOut />
          <Ledgers activeLedger={activeLedger} ledgers={ledgers} />
        </div>
        {activeLedger && <Total total={activeLedger.total} />}
        {activeLedger && <Form activeLedger={activeLedger} />}
      </div>
    );
  }
}
