import React, { useState } from "react";
import uuid from "uuid";
import { database } from "_firebase";

import Button from "components/Button";
import Modal from "components/Modal";
import useAuth from "hooks/useAuth";

const NewLedger = () => {
  const [friendName, setFriendName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { getUserInfo } = useAuth();

  const toggleModal = () => {
    setModalOpen(current => !current);
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setFriendName(value);
  };

  const handleSubmit = () => {
    const { userId, userName } = getUserInfo();
    const userRef = database.ref(`users/${userId}`);
    const newLedgerId = database
      .ref()
      .child("ledgers")
      .push().key;
    database.ref(`ledgers/${newLedgerId}`).set({
      color: "#5f7eaf",
      users: {
        [userId]: userName,
        [uuid()]: friendName
      },
      modified: new Date().toISOString(),
      total: {
        amount: 0,
        to: userId
      }
    });
    userRef.child(`ledgers/${newLedgerId}`).set(true);
    userRef.child("activeLedger").set(newLedgerId);
  };

  return (
    <>
      <Button icon="plus" onClick={toggleModal} />
      <Modal
        title="Agregar Ledger"
        isActive={modalOpen}
        toggleModal={toggleModal}
        onSubmit={handleSubmit}
      >
        <form>
          <p>Color Picker</p>
          <p>Anonymous ? friendName : friendEmail</p>
          <div className="field">
            <label className="label" htmlFor="newLedger">
              <span>Nombre de tu amigo</span>
              <div className="control has-icons-left">
                <input
                  id="newLedger"
                  type="text"
                  className="input"
                  value={friendName}
                  onChange={handleInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="mdi mdi-account" />
                </span>
              </div>
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewLedger;
