import React, { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import { connect } from "react-redux";
import axios from "axios";

function Store({ commonData }) {
  const { store, refreshStoreData } = useDataContext();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize selectedCard when data becomes available
  useEffect(() => {
    if (store?.store?.length > 0) {
      // If we already have a selectedCard, find and update it with fresh data
      if (selectedCard) {
        const updatedCard = store.store.find(card => card.id === selectedCard.id);
        if (updatedCard) {
          setSelectedCard(updatedCard);
        }
      } else {
        setSelectedCard(store.store[0]);
      }
    }
  }, [selectedCard, store]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return;
    if (commonData.islogin === 0) {
      alert("Please Login!");
      return;
    }
    
    setIsSubmitting(true);

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + `/store/addRating`,
        { storeId: selectedCard.id, rate: rating, userId: commonData?.profile.id },
        { withCredentials: true } // Enable cookies for authentication
      );
      
      // Refresh store data to get updated ratings
      if (refreshStoreData) {
        await refreshStoreData();
      } else {
        // Fallback if refreshStoreData is not available: manually update the selectedCard
        const newRating = {
          id: Date.now(), // Temporary ID for UI purposes
          rate: rating,
          userId: commonData?.profile.id,
          storeId: selectedCard.id
        };
        
        setSelectedCard(prev => ({
          ...prev,
          ratings: [...prev.ratings, newRating]
        }));
      }
      
      // Success notification
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setRating(0);
    } catch (err) {
      console.log(err.response?.data?.message || "Add Rating failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "No ratings yet";
    
    const sum = ratings.reduce((total, ratingObj) => total + ratingObj.rate, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // Show a loading state if data hasn't loaded yet
  if (!selectedCard) {
    return <div className="text-white p-6">Loading store data...</div>;
  }

  return (
    <div>
      <h1 className='p-2 text-2xl text-center text-white bg-black'>Hi, {commonData?.profile?.name || "User"}</h1>
      <div className="flex flex-col lg:flex-row gap-6 p-6 h-auto text-white">
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
              src="https://en-media.thebetterindia.com/uploads/2022/09/history-books-1663244949.jpg"
              className="object-contain w-full h-full"
              alt="Store preview"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
              <h2 className="text-2xl font-bold">{selectedCard?.name.toUpperCase() || "No Store"}</h2>
              <p className="text-sm mt-2">Address: {selectedCard?.address || ""}</p>
              <p className="text-sm mt-2">{selectedCard?.email || ""}</p>
              <p className="text-sm mt-2">Overall Rating: {calculateAverageRating(selectedCard?.ratings)}</p>
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
              disabled={isSubmitting || rating === 0}
              className={`${isSubmitting ? 'bg-gray-400' : rating === 0 ? 'bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'} text-black px-4 py-2 rounded font-semibold transition-colors duration-200`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </button>
            {submitted && <p className="text-green-400 text-sm">Rating submitted! ✅</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

const connectToStore = (state) => ({ commonData: state });

export default connect(connectToStore)(Store);