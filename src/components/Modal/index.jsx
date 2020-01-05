import React from "react";
import PropTypes from "prop-types";

export default function Modal({
  isActive,
  toggleModal,
  onSubmit,
  title,
  noFooter,
  primaryButton,
  secondaryButton,
  children,
  requestInProgress
}) {
  const header = (
    <header className="modal-card-head">
      <p className="modal-card-title">{title}</p>
      <button
        type="button"
        className="delete"
        aria-label="close"
        onClick={toggleModal}
      />
    </header>
  );
  const footer = !noFooter ? (
    <footer className="modal-card-foot">
      <button
        type="submit"
        className="button is-success"
        onClick={() => {
          onSubmit();
          toggleModal();
        }}
      >
        {primaryButton}
      </button>
      <button
        type="button"
        className="button"
        onClick={toggleModal}
        disabled={requestInProgress}
      >
        {secondaryButton}
      </button>
    </footer>
  ) : null;
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-card">
        {header}
        <section className="modal-card-body">{children}</section>
        {footer}
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  noFooter: PropTypes.bool,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
  requestInProgress: PropTypes.bool,
  children: PropTypes.node
};

Modal.defaultProps = {
  isActive: false,
  onSubmit: () => {},
  title: "",
  noFooter: false,
  primaryButton: "Aceptar",
  secondaryButton: "Cancelar",
  requestInProgress: false,
  children: null
};
