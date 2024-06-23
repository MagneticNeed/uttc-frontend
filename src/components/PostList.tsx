import React, { useEffect, useState } from 'react';
import { fetchTweets, fetchReplies, createReply, createLike, deleteLike } from '../api';
import { TweetType, ReplyType } from './PostType';

const PostList: React.FC = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReplyPopupOpen, setReplyPopupOpen] = useState<boolean>(false);
  const [currentReplyPost, setCurrentReplyPost] = useState<any>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweetResponse = await fetchTweets();
        const replyResponse = await fetchReplies();

        // APIレスポンスが配列であることを確認
        if (Array.isArray(tweetResponse)) {
          setTweets(tweetResponse);
        } else {
          console.error('Tweet response is not an array');
        }

        if (Array.isArray(replyResponse)) {
          setReplies(replyResponse);
        } else {
          console.error('Reply response is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updateLikes = async () => {
        try {
          for (const postId in likes) {
            if (likes[postId]) {
              await createLike({ tweetId: postId });
            } else {
              await deleteLike(postId);
            }
          }
        } catch (error) {
          console.error('Error updating likes:', error);
        }
      };
      updateLikes();
    }, 10000);

    return () => clearInterval(interval);
  }, [likes]);

  const handleReply = (post: any) => {
    setCurrentReplyPost(post);
    setReplyPopupOpen(true);
  };

  const handleLike = (postId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  };

  const submitReply = async () => {
    if (!currentReplyPost) return;
    try {
      await createReply({ tweetId: currentReplyPost.id, content: replyContent });
      setReplyContent('');
      setReplyPopupOpen(false);
      setCurrentReplyPost(null);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-content">
      <h2>Tweets</h2>
      {tweets.map((tweet) => (
        <div className="post-card" key={tweet.id}>
          <div className="post-card-header">
            <span>{tweet.posted_by}</span>
          </div>
          <div className="post-card-body">
            <p>{tweet.content}</p>
          </div>
          <div className="post-card-footer">
            <button className="reply-button" onClick={() => handleReply(tweet)}>Reply</button>
            <button
              className={`like-button ${likes[tweet.id] ? 'on' : ''}`}
              onClick={() => handleLike(tweet.id)}
            >
              Like
            </button>
          </div>
        </div>
      ))}
      <h2>Replies</h2>
      {replies.map((reply) => (
        <div className="reply-card" key={reply.id}>
          <div className="post-card-header">
            <span>{reply.posted_by}</span>
          </div>
          <div className="post-card-body">
            <p>{reply.content}</p>
          </div>
          <div className="post-card-footer">
            <button className="reply-button" onClick={() => handleReply(reply)}>Reply</button>
            <button
              className={`like-button ${likes[reply.id] ? 'on' : ''}`}
              onClick={() => handleLike(reply.id)}
            >
              Like
            </button>
            {reply.parent_id && (
              <a href={`/posts/${reply.parent_id}`} className="reply-link">View Parent</a>
            )}
          </div>
        </div>
      ))}
      {isReplyPopupOpen && (
        <div className="post-popup">
          <div className="post-popup-content">
            <button className="close-button" onClick={() => setReplyPopupOpen(false)}>×</button>
            <h3>{currentReplyPost?.posted_by}さんへのリプライ</h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply"
              style={{ width: '100%', height: '200px' }}
            />
            <button onClick={submitReply} disabled={replyContent.length > 280}>Reply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
