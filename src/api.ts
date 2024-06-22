import axios from 'axios';

const API_URL = 'https://uttc-be-hzbha42aoq-uc.a.run.app';

// ユーザーAPI
export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchUserById = (id: string) => axios.get(`${API_URL}/users/${id}`);
export const createUser = (userData: any) => axios.post(`${API_URL}/users`, userData);
export const updateUser = (userData: any) => axios.put(`${API_URL}/users`, userData);

// ツイートAPI
export const fetchTweets = () => axios.get(`${API_URL}/tweets`);
export const fetchTweetById = (id: string) => axios.get(`${API_URL}/tweets/${id}`);
export const createTweet = (tweetData: any) => axios.post(`${API_URL}/tweets`, tweetData);
export const deleteTweet = (id: string) => axios.delete(`${API_URL}/tweets/${id}`);

// リプライAPI
export const fetchReplies = () => axios.get(`${API_URL}/replies`);
export const fetchReplyById = (id: string) => axios.get(`${API_URL}/replies/${id}`);
export const createReply = (replyData: any) => axios.post(`${API_URL}/replies`, replyData);
export const deleteReply = (id: string) => axios.delete(`${API_URL}/replies/${id}`);

// いいねAPI
export const fetchLikes = () => axios.get(`${API_URL}/likes`);
export const fetchLikeById = (id: string) => axios.get(`${API_URL}/likes/${id}`);
export const createLike = (likeData: any) => axios.post(`${API_URL}/likes`, likeData);
export const deleteLike = (id: string) => axios.delete(`${API_URL}/likes/${id}`);
