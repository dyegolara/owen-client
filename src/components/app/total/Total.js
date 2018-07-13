import React from 'react'

import AppStorage from 'appStorage'

const getTotalLabel = total => {
  if (total.amount === 0) return 'Debes'
  return total.to === AppStorage.getUserId() ? 'Te deben' : 'Debes'
}

const Total = ({ total }) => (
  <div className='flex-center'>
    <div className='box'>
      <div className='level'>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>{getTotalLabel(total)}</p>
            <p className='title'>$ {total.amount}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Total
