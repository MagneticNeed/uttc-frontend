export type TweetType = {
    id: string;
    content: string;
    posted_by: string;
    created_at: string;
    like_count: number;
}
export type ReplyType = {
    id: string;
    parent_id: string;
    posted_by: string;
    content: string;
    created_at: string;
    like_count: number;
}
