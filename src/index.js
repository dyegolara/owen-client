import { render } from 'react-dom'
import React from 'react'

class App extends React.Component {
  render() {
    return <div>Hola</div>
  }
}

render(<App />, document.getElementById('app'))
