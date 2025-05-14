import React, { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import { connect } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Store({ commonData }) {
  const { store, refreshStoreData } = useDataContext();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeError, setStoreError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (store?.store?.length > 0) {
      setStoreError(false);
      if (selectedCard) {
        const updatedCard = store.store.find(card => card.id === selectedCard.id);
        if (updatedCard) {
          setSelectedCard(updatedCard);
        }
      } else {
        setSelectedCard(store.store[0]);
      }
    } else if (store && Array.isArray(store.store) && store.store.length === 0) {
      setStoreError(true);
    }
  }, [selectedCard, store]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return;
    if (commonData.islogin === 0) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + `/store/addRating`,
        { storeId: selectedCard.id, rate: rating, userId: commonData?.profile.id },
        { withCredentials: true }
      );

      if (refreshStoreData) {
        await refreshStoreData();
      } else {
        const newRating = {
          id: Date.now(),
          rate: rating,
          userId: commonData?.profile.id,
          storeId: selectedCard.id
        };

        setSelectedCard(prev => ({
          ...prev,
          ratings: [...prev.ratings, newRating]
        }));
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setRating(0);
    } catch (err) {
      console.log(err.response?.data?.message || "Add Rating failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "No ratings yet";
    const sum = ratings.reduce((total, ratingObj) => total + ratingObj.rate, 0);
    return (sum / ratings.length).toFixed(1);
  };

  if (storeError) {
    return (
      <div className="text-red-500 p-6 h-screen text-center bg-white text-xl">
        <div>❌ Unable to fetch store data. Please try again later.</div>
        <div>Connect Backend properly.</div>
      </div>
    );
  }

  if (!selectedCard) {
    return <div className="text-white p-6">Loading store data...</div>;
  }

  return (
    <div >
      <h1 className='p-2 text-2xl text-center text-white bg-black'>
        Hi {commonData?.profile?.name ? commonData.profile.name + ", Welcome" : "User, Please Login!"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 p-6 h-auto text-white">
        <div className="w-full lg:w-1/4 grid grid-cols-2 gap-4">
          {store.store.map((card) => {
            const isActive = selectedCard?.id === card.id;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`h-auto rounded-xl flex items-center p-2 justify-center font-semibold transition-all duration-300 text-lg text-white shadow-md cursor-pointer 
                bg-gradient-to-br ${card.gradient || 'from-yellow-600 to-yellow-800'} 
                ${isActive ? 'ring-4 ring-yellow-300 scale-105' : ''}`}
              >
                {card.name.toUpperCase()}
              </button>
            );
          })}
        </div>

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
