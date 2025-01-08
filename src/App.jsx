import { useState } from 'react'

import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import './App.css'
import Die from './components/Die'


function App() {

  const [dice, setDice] = useState(() => allDice())

  const gameWon = dice.every(die => die.isHeld) &&
                  dice.every(die => die.value === dice[0].value)



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
    if (gameWon) {
      setDice(() => allDice())

     } else {
      setDice(die => die.map(dieObj => {
        if (dieObj.isHeld) {
          return dieObj
        }
        return {
          ...dieObj,
          value: (Math.ceil(Math.random() * 6))
        }
      })
      )
     }

    
    
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
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className='die-container'>
        {dieElements}
      </div>

      <button onClick={rollDie} className='roll-die-btn'>{gameWon ? "New Game" : "Roll"}</button>

    </main>
  )
}

export default App
