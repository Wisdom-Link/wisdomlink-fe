export type Message = {
  sender: string;
  content: string;
  timestamp: Date;
};

export type Chat = {
  _id: string;
  content: string;
  tags?: string[]; // 添加 tags 字段
  taps?: string[]; // 保留 taps 作为备选
  community: string;
  imageUrl?: string;
  status: 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
  role: 'questioner' | 'answerer';
  partnerUsername?: string; // 添加 partnerUsername 字段
  partnerId?: string;
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
