import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const LikeButton: React.FC<{ tweetId: string }> = ({ tweetId }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`${API_URL}/likes/${tweetId}`);
      } else {
        await axios.post(`${API_URL}/likes`, { tweetId });
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
