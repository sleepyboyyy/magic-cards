import './App.css'
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    {"src": "/img/helmet-1.png", matched: false },
    {"src": "/img/potion-1.png", matched: false },
    {"src": "/img/ring-1.png", matched: false },
    {"src": "/img/scroll-1.png", matched: false },
    {"src": "/img/shield-1.png", matched: false },
    {"src": "/img/sword-1.png", matched: false }
]

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }) )

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    }

    // Handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    // Handle comparison
    useEffect(() => {
        if (choiceTwo) {
            setDisabled(true);
            if( choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
                setCards(prev => {
                    return prev.map(card => {
                        if (card.src === choiceTwo.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurns();
            } else {
                setTimeout(() => resetTurns(), 1000);
            }
        }
    } , [choiceTwo] )
    console.log(cards);
    // Load game on enter
    useEffect(() => {
        shuffleCards();
    }, [])

    // Reset turns

    const resetTurns = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prev => prev+1);
        setDisabled(false);
    }

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    );
}

export default App