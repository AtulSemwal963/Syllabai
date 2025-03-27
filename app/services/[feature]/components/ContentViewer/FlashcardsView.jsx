export default function FlashcardsView({ pdfText, flippedCards, toggleFlip }) {
  if (!Array.isArray(pdfText) || !pdfText.every((item) => 'topic' in item && 'flashcards' in item)) {
    return (
      <p className="text-red-600">
        Expected an array of topics with flashcards, but received: {JSON.stringify(pdfText)}
      </p>
    );
  }

  if (pdfText.length === 0) {
    return <p className="text-gray-600">No flashcards found.</p>;
  }

  return (
    <div className="space-y-6">
      {pdfText.map((topic, topicIndex) => (
        <div key={topicIndex} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {topic.flashcards.map((card, cardIndex) => {
              const key = `${topicIndex}-${cardIndex}`;
              const isFlipped = flippedCards[key] || false;
              return (
                <div
                  key={cardIndex}
                  className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(topicIndex, cardIndex)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <span className="topic-badge">{topic.topic}</span>
                      <p className="card-content">{card.question}</p>
                    </div>
                    <div className="flip-card-back">
                      <p className="card-content">{card.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 