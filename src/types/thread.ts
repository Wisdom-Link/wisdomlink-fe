export type Post = {
  _id?: string; // 新增 ID 字段，用于更新操作
  userAvatar: string;
  username: string;
  createdAt: string;
  location?: string;
  community?: string;
  content: string;
  tags?: string[];
  mode?: 'answer' | 'edit'; // 新增模式参数
  onAnswer?: (username: string) => void; // 回答模式下的回调函数
  onEdit?: () => void; // 编辑模式下的回调函数
};

