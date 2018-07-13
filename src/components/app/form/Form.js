import React from 'react'
import Button from 'shared/button'

export default () => (
  <div className='columns'>
    <div className='column'>
      <Button>Me deben</Button>
    </div>
    <div className='column'>
      <input className='input' type='text' />
    </div>
    <div className='column'>
      <Button>Debo</Button>
    </div>
  </div>
)
