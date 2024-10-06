export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ChatContextType {
  threads: Thread[];
  currentThread: Thread | null;
  createThread: () => void;
  selectThread: (threadId: string) => void;
  sendMessage: (content: string) => void;
}