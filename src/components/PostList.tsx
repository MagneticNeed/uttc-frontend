import React, { useEffect, useState } from 'react';
import { fetchTweets, fetchReplies, createReply, createLike, deleteLike } from '../api';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReplyPopupOpen, setReplyPopupOpen] = useState<boolean>(false);
  const [currentReplyPost, setCurrentReplyPost] = useState<any>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tweetResponse, replyResponse] = await Promise.all([fetchTweets(), fetchReplies()]);
        const allPosts = [...tweetResponse.data, ...replyResponse.data].sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(allPosts);

        const initialLikes: { [key: string]: boolean } = {};
        allPosts.forEach((post: any) => {
          initialLikes[post.id] = post.liked;
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
      {posts.map((post) => (
        <div className={`post-card ${post.parentId ? 'reply-card' : ''}`} key={post.id}>
          <div className="post-card-header">
            <span>{post.user?.name}</span>
          </div>
          <div className="post-card-body">
            <p>{post.content}</p>
          </div>
          <div className="post-card-footer">
            <button className="reply-button" onClick={() => handleReply(post)}>Reply</button>
            <button
              className={`like-button ${likes[post.id] ? 'on' : ''}`}
              onClick={() => handleLike(post.id)}
            >
              Like
            </button>
            {post.parentId && (
              <a href={`/posts/${post.parentId}`} className="reply-link">View Parent</a>
            )}
          </div>
        </div>
      ))}
      {isReplyPopupOpen && (
        <div className="post-popup">
          <div className="post-popup-content">
            <button className="close-button" onClick={() => setReplyPopupOpen(false)}>×</button>
            <h3>{currentReplyPost?.user?.name}さんへのリプライ</h3>
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
