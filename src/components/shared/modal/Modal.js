import React from 'react'

const Modal = ({
  isActive,
  toggleModal,
  onSubmit,
  title,
  noFooter,
  primaryButton,
  secondaryButton,
  children,
  requestInProgress
}) => {
  const header = (
    <header className='modal-card-head'>
      <p className='modal-card-title'>{title}</p>
      <button className='delete' aria-label='close' onClick={toggleModal} />
    </header>
  )
  const footer = !noFooter ? (
    <footer className='modal-card-foot'>
      <button
        className={'button is-success'}
        onClick={() => {
          onSubmit()
          toggleModal()
        }}
      >
        {primaryButton}
      </button>
      <button
        className='button'
        onClick={toggleModal}
        disabled={requestInProgress}
      >
        {secondaryButton}
      </button>
    </footer>
  ) : null
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className='modal-background' onClick={toggleModal} />
      <div className='modal-card'>
        {header}
        <section className='modal-card-body'>{children}</section>
        {footer}
      </div>
    </div>
  )
}

export default Modal

Modal.defaultProps = {
  isActive: false,
  onSubmit: () => {},
  title: '',
  noFooter: false,
  primaryButton: 'Aceptar',
  primaryIcon: 'check',
  secondaryButton: 'Cancelar',
  secondaryIcon: 'cancel',
  requestInProgress: false
}
