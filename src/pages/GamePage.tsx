import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Chat from "../components/Chat";

interface GamePageProps {
  username: string;
  animal: string;
}

export default function GamePage({ username, animal }: GamePageProps) {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((pos) => {
        const step = 10;
        switch (e.key) {
          case 'ArrowUp':
            return { ...pos, y: pos.y - step };
          case 'ArrowDown':
            return { ...pos, y: pos.y + step };
          case 'ArrowLeft':
            return { ...pos, x: pos.x - step };
          case 'ArrowRight':
            return { ...pos, x: pos.x + step };
          default:
            return pos;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, `${username} (${animal}): ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-green-100 flex-1 relative overflow-hidden">
        <Avatar animal={animal} position={position} />
      </div>
      <Chat chatMessages={chatMessages} message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
    
  );
}