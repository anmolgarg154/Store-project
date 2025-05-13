import React, { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import axios from 'axios';

export default function Store() {
  const { store, userId } = useDataContext(); // Assume `userId` is available from context
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Initialize selectedCard when data becomes available
  useEffect(() => {
    if (store?.store?.length > 0) {
      setSelectedCard(store.store[0]);
    }
  }, [store]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the card and userId are available
    if (!selectedCard || !userId) {
      alert('Store or User not found!');
      return;
    }

    try {
      // Send the rating to the backend via an API call
      const response = await axios.post('http://localhost:5000/api/v1/store/addRating', {
        storeId: selectedCard.id,
        rate: rating,
        userId: userId, // Send the userId as part of the request
      });

      // Check if the rating submission was successful
      if (response.data.success) {
        alert('Rating submitted successfully!');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
        setRating(0); // Reset the rating after submission
      } else {
        alert('Failed to submit rating.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred while submitting your rating.');
    }
  };

  // Show a loading state if data hasn't loaded yet
  if (!selectedCard) {
    return <div className="text-white p-6">Loading store data...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-[600px] text-white">
      {/* Left side: Store Cards */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        {store.store.map((card) => {
          const isActive = selectedCard?.id === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`h-36 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 text-lg text-white shadow-md cursor-pointer 
              bg-gradient-to-br ${card.gradient || 'from-blue-600 to-blue-800'} 
              ${isActive ? 'ring-4 ring-yellow-300 scale-105' : ''}`}
            >
              {card.name.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Right side: Store Preview & Rating */}
      <div className="w-full lg:w-3/4 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-[400px] w-full">
          <img
            src={selectedCard?.image || "https://en-media.thebetterindia.com/uploads/2022/09/history-books-1663244949.jpg"}
            className="object-contain w-full h-full"
            alt="Store preview"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-bold">{selectedCard?.name.toUpperCase() || "No Store"}</h2>
            <p className="text-sm mt-2">Address: {selectedCard?.address || ""}</p>
            <p className="text-sm mt-2">{selectedCard?.email || ""}</p>
          </div>
        </div>

        {/* Rating Section */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3 bg-black/60">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
          >
            Submit Rating
          </button>
          {submitted && <p className="text-green-400 text-sm">Rating submitted! ✅</p>}
        </form>
      </div>
    </div>
  );
}
