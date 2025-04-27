// src/components/Chat.tsx
import { useState, useEffect, useRef } from "react";

interface ChatProps {
  chatMessages: string[];
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
}

export default function Chat({ chatMessages, message, setMessage, sendMessage }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-100 p-4 border-t-2 border-gray-300">
      <div className="h-32 overflow-y-auto mb-2 bg-white rounded p-2">
        {chatMessages.map((msg, index) => (
          <div key={index} className="text-sm mb-1">{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}