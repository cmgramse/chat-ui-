import React, { createContext, useState, useContext } from 'react';
import { Thread, ChatContextType, Message } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThread, setCurrentThread] = useState<Thread | null>(null);

  const createThread = () => {
    const newThread: Thread = {
      id: Date.now().toString(),
      title: `New Thread ${threads.length + 1}`,
      messages: [],
    };
    setThreads([...threads, newThread]);
    setCurrentThread(newThread);
  };

  const selectThread = (threadId: string) => {
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      setCurrentThread(thread);
    }
  };

  const sendMessage = (content: string) => {
    if (currentThread) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date(),
      };
      const updatedThread = {
        ...currentThread,
        messages: [...currentThread.messages, newMessage],
      };
      setThreads(threads.map(t => t.id === currentThread.id ? updatedThread : t));
      setCurrentThread(updatedThread);

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'This is a simulated bot response.',
          sender: 'bot',
          timestamp: new Date(),
        };
        const threadWithBotResponse = {
          ...updatedThread,
          messages: [...updatedThread.messages, botMessage],
        };
        setThreads(threads.map(t => t.id === currentThread.id ? threadWithBotResponse : t));
        setCurrentThread(threadWithBotResponse);
      }, 1000);
    }
  };

  return (
    <ChatContext.Provider value={{ threads, currentThread, createThread, selectThread, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};