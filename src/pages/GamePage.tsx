import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Chat from "../components/Chat";

interface GamePageProps {
  username: string;
  animal: string;
}

export default function GamePage({ username, animal }: GamePageProps) {
  const [player, setPlayer] = useState({
    position: { x: 200, y: 200 },
    direction: 'right' as 'left' | 'right',
    isWalking: false
  });

  const [diamonds, setDiamonds] = useState(0);
  const [collectibles, setCollectibles] = useState([
    { id: 'gem1', position: { x: 300, y: 150 } },
    { id: 'gem2', position: { x: 100, y: 250 } },
  ]);

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Movimento e coleta
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      let newPosition = { ...player.position };
      let direction = player.direction;
      let isWalking = false;

      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - step);
          isWalking = true;
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(window.innerHeight - 100, newPosition.y + step);
          isWalking = true;
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - step);
          direction = 'left';
          isWalking = true;
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(window.innerWidth, newPosition.x + step);
          direction = 'right';
          isWalking = true;
          break;
      }

      // Verificar colisão com diamantes
      const collectedIndex = collectibles.findIndex(c => {
        const distance = Math.sqrt(
          Math.pow(c.position.x - newPosition.x, 2) + 
          Math.pow(c.position.y - newPosition.y, 2)
        );
        return distance < 30;
      });

      if (collectedIndex !== -1) {
        const collected = collectibles[collectedIndex];
        setCollectibles(prev => prev.filter(c => c.id !== collected.id));
        setDiamonds(prev => prev + 1);
        setChatMessages(prev => [...prev, `${username} encontrou um diamante! 💎`]);

        // Respawn do diamante após 3 segundos
        setTimeout(() => {
          setCollectibles(prev => [...prev, {
            id: `gem-${Date.now()}`,
            position: {
              x: Math.random() * (window.innerWidth - 100) + 50,
              y: Math.random() * (window.innerHeight - 200) + 50
            }
          }]);
        }, 3000);
      }

      setPlayer({ position: newPosition, direction, isWalking });
    };

    const handleKeyUp = () => {
      setPlayer(prev => ({ ...prev, isWalking: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [player.position, collectibles, username]);

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, `${username} (${animal}): ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-green-100">
      {/* Área do jogo */}
      <div className="flex-1 relative overflow-hidden">
        {/* Diamantes */}
        {collectibles.map(gem => (
          <div
            key={gem.id}
            className="absolute text-3xl animate-pulse"
            style={{
              left: `${gem.position.x}px`,
              top: `${gem.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            💎
          </div>
        ))}

        {/* Jogador */}
        <Avatar
          animal={animal}
          position={player.position}
          direction={player.direction}
          isWalking={player.isWalking}
        />

        {/* Inventário de diamantes */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow flex items-center gap-2">
          <span className="text-2xl">💎</span>
          <span className="font-bold">{diamonds}</span>
        </div>

        {/* Pontuação */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow">
          Pontos: <span className="font-bold">{diamonds * 10}</span>
        </div>
      </div>

      {/* Chat */}
      <Chat 
        chatMessages={chatMessages} 
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
    
  );
  
}