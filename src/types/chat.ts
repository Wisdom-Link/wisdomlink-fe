export interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  _id?: string;
  imageUrl?: string;
  questionUserId: string;
  answerUserId: string;
  tap?: string;
  subject?: string;
  status?: 'ongoing' | 'completed';
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
}
