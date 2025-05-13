import React, { useState } from 'react';

const cards = [
  {
    id: 'Early India',
    title: 'Early India',
    description: 'Filmora allows us to create impactful promo videos quickly and with style.',
    image: 'https://en-media.thebetterindia.com/uploads/2022/09/history-books-1663244949.jpg',
    gradient: 'from-fuchsia-600 via-pink-500 to-orange-200',
    label: 'Early India',
  },
  {
    id: 'Fried Green',
    title: 'Fried-Green',
    description: 'Sleek editing with strong audio syncing helped us deliver compelling sound stories.',
    image: 'http://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1123,w_2000,x_0,y_0/c_fill,f_auto,h_900,q_auto,w_1600/v1/m/2/b/2bf2907d5783308037578e19bf26fb523e61944a/22-famous-book-titles-include-food.jpg',
    gradient: 'from-blue-600 via-purple-400 to-white',
    label: 'Fried Green',
  },
  {
    id: 'Paddington',
    title: 'Paddington',
    description: 'With Filmora, we quickly communicate ideas to our security clients with ease.',
    image: 'https://storage.googleapis.com/brookes-workshop.appspot.com/bookReviews/cf104b85-4d6b-47b6-ad0a-0b7cb49c2849/cover_photo/1024wjpeg_cover_photo.jpg',
    gradient: 'from-pink-600 via-orange-500 to-white',
    label: 'Paddington',
  },
    {
    id: 'Harry Potter',
    title: 'Chamber secrets',
    description: 'With Filmora, we quickly communicate ideas to our security clients with ease.',
    image: 'http://ghk.h-cdn.co/assets/16/25/1466794536-books.jpg',
    gradient: 'from-pink-600 via-orange-500 to-white',
    label: 'Harry Potter',
  },
];

export default function Slide() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ cardId: selectedCard.id, rating, feedback });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-900 min-h-[600px] text-white">
      {/* Left side: Book Preview & Feedback */}
      <div className="flex flex-col w-3/4 bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-[400px] w-full">
          <img
            src={selectedCard.image}
            alt={selectedCard.title}
            className="object-contain w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
            <p className="text-sm mt-2">{selectedCard.description}</p>
          </div>
        </div>

        {/* Feedback Section */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3 bg-black/60">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full rounded p-2 bg-gray-800 border border-gray-700 resize-none"
            placeholder="Leave your feedback..."
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
          >
            Submit Feedback
          </button>
          {submitted && <p className="text-green-400 text-sm">Feedback submitted! ✅</p>}
        </form>
      </div>

      {/* Right side: Book Cards */}
      <div className="flex flex-col gap-4 w-1/4">
        {cards.map((card) => {
          const isActive = selectedCard.id === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`h-36 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 text-lg text-white shadow-md cursor-pointer bg-gradient-to-br ${card.gradient} ${isActive ? 'ring-4 ring-yellow-300 scale-105' : ''
                }`}
            >
              {card.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


