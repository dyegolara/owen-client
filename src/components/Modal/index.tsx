import React from "react";

type Props = {
  toggleModal: () => void,
  isActive: boolean,
  onSubmit: () => void,
  title: string,
  noFooter: boolean,
  primaryButton: string,
  secondaryButton: string,
  requestInProgress: boolean,
  children: React.ReactNode
}

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
}: Props) {
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
