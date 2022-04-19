import './App.css'
import {useEffect, useState} from "react";
import SingleCards from "./components/SingleCards";

const cardImages = [
    {"src":"/img/helmet-1.png", matched: false},
    {"src":"/img/potion-1.png", matched: false},
    {"src":"/img/ring-1.png", matched: false},
    {"src":"/img/scroll-1.png", matched: false},
    {"src":"/img/shield-1.png", matched: false},
    {"src":"/img/sword-1.png", matched: false},
]

function App() {
    const [cards, setCards] = useState([]) // empty array
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages] // double the array of cards for pairs
            .sort(() => Math.random() - 0.5) // sort a random number
            .map((card) => ({...card, id: Math.random() })) // give random numbber as id

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffleCards) // state the shuffledcards
        setTurns(0)
    }

    // handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)

            if (choiceOne.src === choiceTwo.src ) {
              setCards(prevCards => {
                  return prevCards.map(card => {
                      if (card.src === choiceOne.src) {
                          return {...card, matched: true}
                      } else {
                              return card
                          }
                  })
              })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }

        }
    }, [choiceOne, choiceTwo])

    console.log(cards)

    //reset choices and increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    // start auto
    useEffect(() => {
        shuffleCards()
    }, [])

  return (
    <div className="App">
      <h1>Anatolia's Memory</h1>
      <button onClick={shuffleCards}>Nouvelle partie !</button>

        <div className="card-grid">
            {cards.map(card => (
                <SingleCards
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card .matched}
                    disabled={disabled}

                />
            ))}
        </div>
        <p>Nombre de tour : {turns}</p>
    </div>
  );
}

export default App