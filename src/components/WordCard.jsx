// src/components/WordCard.jsx
import React from 'react';

const WordCard = ({ word, isEnglish, isSelected, isMatched, onClick }) => {
  const baseStyle = "px-4 py-2 rounded-full cursor-pointer text-white text-center transition-all duration-300 shadow-md";
  const selectedStyle = "scale-110 ring-2 ring-white";
  
  const bgColor = isEnglish 
    ? "bg-[#f08080]" // coral pink for English
    : "bg-[#98d8d8]"; // mint green for Chinese

  if (isMatched) {
    return null; // Don't render matched cards
  }

  return (
    <div
      onClick={onClick}
      className={`
        ${baseStyle}
        ${bgColor}
        ${isSelected ? selectedStyle : ''}
        hover:scale-105
        animate-fadeIn
      `}
    >
      {word}
    </div>
  );
};

export default WordCard;