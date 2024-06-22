import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchTweets, fetchReplies, fetchLikes } from '../api';

const User: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await fetchUsers();
        const loggedInUser = responseUsers.data.find((u: any) => u.email === user.email);
        setUser(loggedInUser);

        const responseTweets = await fetchTweets();
        setTweets(responseTweets.data.filter((tweet: any) => tweet.userId === loggedInUser.id));

        const responseReplies = await fetchReplies();
        setReplies(responseReplies.data.filter((reply: any) => reply.userId === loggedInUser.id));

        const responseLikes = await fetchLikes();
        setLikes(responseLikes.data.filter((like: any) => like.userId === loggedInUser.id));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-content">
      <h2>{user?.name}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3>My Tweets and Replies</h3>
          {tweets.map((tweet) => (
            <div className="post-card" key={tweet.id}>
              <div className="post-card-header">
                <span>{tweet.user?.name}</span>
              </div>
              <div className="post-card-body">
                <p>{tweet.content}</p>
              </div>
              <div className="post-card-footer">
                <button className="reply-button">Reply</button>
                <button className={`like-button ${tweet.liked ? 'on' : ''}`}>Like</button>
              </div>
            </div>
          ))}
          {replies.map((reply) => (
            <div className="post-card" key={reply.id}>
              <div className="post-card-header">
                <span>{reply.user?.name}</span>
              </div>
              <div className="post-card-body">
                <p>{reply.content}</p>
              </div>
              <div className="post-card-footer">
                <button className="reply-button">Reply</button>
                <button className={`like-button ${reply.liked ? 'on' : ''}`}>Like</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>My Likes</h3>
          {likes.map((like) => (
            <div className="post-card" key={like.id}>
              <div className="post-card-header">
                <span>{like.user?.name}</span>
              </div>
              <div className="post-card-body">
                <p>{like.content}</p>
              </div>
              <div className="post-card-footer">
                <button className="reply-button">Reply</button>
                <button className={`like-button ${like.liked ? 'on' : ''}`}>Like</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
