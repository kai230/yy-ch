// src/App.jsx
import React, { useState, useEffect } from 'react';
import { wordPairs } from './data/wordPairs';
import WordCard from './components/WordCard';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [
      ...wordPairs.map(pair => ({ id: `en_${pair.english}`, word: pair.english, isEnglish: true, pair: pair.chinese })),
      ...wordPairs.map(pair => ({ id: `zh_${pair.chinese}`, word: pair.chinese, isEnglish: false, pair: pair.english }))
    ];
    
    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedPairs([]);
    setIsGameComplete(false);
  };

  const handleCardClick = (clickedCard) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.includes(clickedCard.id)) return;
    if (matchedPairs.includes(clickedCard.word)) return;

    const newSelected = [...selectedCards, clickedCard.id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstCardId, secondCardId] = newSelected;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (
        (firstCard.isEnglish && firstCard.word === secondCard.pair) ||
        (secondCard.isEnglish && secondCard.word === firstCard.pair)
      ) {
        // Match found
        setTimeout(() => {
          const newMatchedPairs = [...matchedPairs, firstCard.word, secondCard.word];
          setMatchedPairs(newMatchedPairs);
          setSelectedCards([]);
          
          // Check if game is complete
          if (newMatchedPairs.length === cards.length) {
            setIsGameComplete(true);
          }
        }, 600);
      } else {
        // No match - clear selection after delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          英语单词配对游戏
        </h1>
        
        {isGameComplete ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl text-green-600 font-bold mb-4">
              恭喜！你完成了所有配对！
            </h2>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              重新开始
            </button>
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              请点击卡片配对英文单词和中文翻译
            </p>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              重新洗牌
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* English words column */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">英文单词</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.filter(card => card.isEnglish).map(card => (
                <WordCard
                  key={card.id}
                  word={card.word}
                  isEnglish={card.isEnglish}
                  isSelected={selectedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.word)}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </div>
          
          {/* Chinese translations column */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">中文翻译</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.filter(card => !card.isEnglish).map(card => (
                <WordCard
                  key={card.id}
                  word={card.word}
                  isEnglish={card.isEnglish}
                  isSelected={selectedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.word)}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;