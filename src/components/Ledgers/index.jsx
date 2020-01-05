import React, { useState } from "react";
import PropTypes from "prop-types";
import { database } from "firebaseApi";
import useAuth from "hooks/useAuth";
import LedgerShape from "./propTypes";

export default function SelectLedger({ activeLedger, ledgers }) {
  const [isActive, setIsActive] = useState(false);
  const { getUserInfo } = useAuth();
  const { userId } = getUserInfo();

  const toggleDropdown = () => {
    setIsActive(current => !current);
  };

  const setActiveLedger = ledgerId => {
    toggleDropdown();
    database.ref(`users/${userId}`).update({
      activeLedger: ledgerId
    });
  };

  const getFriendName = ledger => {
    if (ledgers.length === 0 || !ledger) return "";
    const friendId = Object.keys(ledger.users).find(id => id !== userId);
    return ledger.users[friendId];
  };

  const activeFriendName = getFriendName(activeLedger);

  return (
    <div className={`dropdown ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          type="button"
          onClick={toggleDropdown}
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{activeFriendName || "Amigos"}</span>
          <span className="icon is-small">
            <i className="mdi mdi-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {ledgers.length > 0 &&
            ledgers.map(ledger => (
              <button
                type="button"
                key={ledger.id}
                className="dropdown-item"
                onClick={() => setActiveLedger(ledger.id)}
              >
                {getFriendName(ledger)}
              </button>
            ))}
          <hr className="dropdown-divider" />
        </div>
      </div>
    </div>
  );
}

SelectLedger.propTypes = {
  activeLedger: LedgerShape,
  ledgers: PropTypes.arrayOf(LedgerShape).isRequired
};

SelectLedger.defaultProps = {
  activeLedger: null
};
