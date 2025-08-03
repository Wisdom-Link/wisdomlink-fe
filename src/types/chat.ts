export type Message = {
  sender: string;
  content: string;
  timestamp: Date;
};

export type Chat = {
  _id: string;
  subject: string;
  tap: string[];
  imageUrl?: string;
  status: 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
  role: 'questioner' | 'answerer';
  partnerId: string;
  messageCount: number;
};

export type ChatListResponse = {
  success: boolean;
  data: Chat[];
  total: number;
  filters: {
    status: string;
    role: string;
  };
};
