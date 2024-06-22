import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ReplyForm: React.FC<{ tweetId: string }> = ({ tweetId }) => {
  const [content, setContent] = useState('');

  const handleReply = async () => {
    try {
      const response = await axios.post(`${API_URL}/replies`, {
        tweetId,
        content,
      });
      console.log('Reply created:', response.data);
      setContent('');
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
      />
      <button onClick={handleReply}>Reply</button>
    </div>
  );
};

export default ReplyForm;
