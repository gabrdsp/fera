import { useRef, useEffect, useState } from "react";

interface ChatProps {
  chatMessages: string[];
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
}

const emojis = ['😀', '😭', '😡', '😱', '❤️'];

export default function Chat({ chatMessages, message, setMessage, sendMessage }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="bg-gray-100 p-4 border-t-2 border-gray-300 relative">
      <div className="h-32 overflow-y-auto mb-2 bg-white rounded p-2">
        {chatMessages.map((msg, i) => (
          <div key={i} className="text-sm mb-1">{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showEmojis && (
        <div className="absolute bottom-16 left-0 bg-white p-2 rounded-lg shadow-lg flex gap-1">
          {emojis.map(emoji => (
            <button
              key={emoji}
              onClick={() => addEmoji(emoji)}
              className="text-2xl hover:scale-125 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button 
          onClick={() => setShowEmojis(!showEmojis)}
          className="px-3 text-xl bg-gray-200 rounded"
        >
          😀
        </button>
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