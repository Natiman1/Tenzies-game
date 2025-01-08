import { useState } from 'react'

import { nanoid } from 'nanoid'

import './App.css'
import Die from './components/Die'


function App() {

  const [dice, setDice] = useState(allDice())

  function allDice() {
    let dice = []
    for (let i = 0; i < 10; i++) {
      dice.push({
        value: (Math.ceil(Math.random() * 6)),
        isHeld: false,
        id: nanoid()
      })
    }
    return dice
  }

  function rollDie() {
    setDice(allDice())
  }

  const dieElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />)
  )
  function hold(id) {
    setDice(dice.map(dieObj => {
      if (dieObj.id === id) {
        return {
          ...dieObj,
          isHeld: !dieObj.isHeld
        }
      }
      return dieObj
    }))
  }
  

  return (
    <main>
      <div className='die-container'>
        {dieElements}
      </div>

      <button onClick={rollDie} className='roll-die-btn'>Roll</button>

    </main>
  )
}

export default App
