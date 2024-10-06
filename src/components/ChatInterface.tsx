import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { MessageCircle, Send } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { threads, currentThread, createThread, selectThread, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <button
            onClick={createThread}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Chat
          </button>
        </div>
        <nav className="mt-5 px-2">
          {threads.map((thread) => (
            <a
              key={thread.id}
              onClick={() => selectThread(thread.id)}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                currentThread?.id === thread.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              {thread.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentThread?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;