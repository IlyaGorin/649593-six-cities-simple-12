export type User = {
  avatarUrl: string;
  id: number;
  name: string;
  isPro: boolean;
}

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type CommentData = {
  comment: string;
  rating: number;
}
