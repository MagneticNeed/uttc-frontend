import axios from 'axios';
import { TweetType, ReplyType } from './components/PostType';

const API_URL = 'https://uttc-be-hzbha42aoq-uc.a.run.app'; //"http://localhost:8000"; 

// ユーザーAPI
export const fetchUsers = () => axios.get(`${API_URL}/users`);
// sessionStorageからgetItemでidを取得し、そのidを使ってユーザー情報を取得する
var getData = JSON.parse(sessionStorage.getItem('userData') || '{}');
export const fetchUserById = (id: string) => axios.get(`${API_URL}/users/${getData.id}`);
export const createUser = (userData: any) => axios.post(`${API_URL}/users`, userData);
export const updateUser = (userData: any) => axios.put(`${API_URL}/users`, userData);

// ツイートAPI
export const fetchTweets = async (): Promise<TweetType[]> => {
    const response = await axios.get<TweetType[]>(`${API_URL}/tweets`);
    return response.data;
  };
// export const fetchTweets = (): Promise<TweetType[]> => axios.get(`${API_URL}/tweets`);
export const fetchTweetById = (id: string) => axios.get(`${API_URL}/tweets/${id}`);
// export const createTweet = async (tweetData: any) => {
//     const response = await axios.post(`${API_URL}/tweets`, tweetData);
//     return response.data;
//   };
export const createTweet = (tweetData: any) => axios.post(`${API_URL}/tweets`, tweetData);
export const deleteTweet = (id: string) => axios.delete(`${API_URL}/tweets/${id}`);

// リプライAPI
export const fetchReplies = async (): Promise<ReplyType[]> => {
    const response = await axios.get<ReplyType[]>(`${API_URL}/replies`);
    return response.data;
  };
// export const fetchReplies = (): Promise<ReplyType[]> => axios.get(`${API_URL}/replies`);
export const fetchReplyById = (id: string) => axios.get(`${API_URL}/replies/${id}`);
export const createReply = (replyData: any) => axios.post(`${API_URL}/replies`, replyData);
export const deleteReply = (id: string) => axios.delete(`${API_URL}/replies/${id}`);

// いいねAPI
export const fetchLikes = () => axios.get(`${API_URL}/likes`);
export const fetchLikeById = (id: string) => axios.get(`${API_URL}/likes/${id}`);
export const createLike = (likeData: any) => axios.post(`${API_URL}/likes`, likeData);
export const deleteLike = (id: string) => axios.delete(`${API_URL}/likes/${id}`);
