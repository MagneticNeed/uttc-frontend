import React, { useState } from 'react';
import { createTweet } from '../api';
import { getData, UserType } from './UserType';

interface PostFormProps {
  onPost: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handlePost = async () => {
    if (content.length > 280) {
      setError('Content exceeds the maximum length of 280 characters.');
      return;
    }

    try {
      const userData: UserType = getData();
      console.log('Creating post:', content, userData.id);
      await createTweet({ content, posted_by: userData.id });
      setContent('');
      setError('');
      onPost();
    } catch (error) {
      console.error('Error creating post:', error);
      console.error('sessionStorage content:', sessionStorage.getItem('userData'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    if (value.length > 280) {
      setError('Content exceeds the maximum length of 280 characters.');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="What's on your mind?"
        style={{ width: '100%', height: '200px' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handlePost} disabled={content.length > 280}>Post</button>
    </div>
  );
};

export default PostForm;
