export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  type: 'text' | 'yaml';
  reviewed?: boolean;
}
