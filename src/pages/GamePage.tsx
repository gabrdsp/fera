// src/pages/GamePage.tsx
import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Chat from "../components/Chat";

interface Player {
  id: string;
  username: string;
  animal: string;
  position: { x: number; y: number };
  direction: 'left' | 'right';
  isWalking: boolean;
}

interface Collectible {
  id: string;
  type: string;
  position: { x: number; y: number };
}

export default function GamePage({ username, animal }: GamePageProps) {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'player1',
      username,
      animal,
      position: { x: 200, y: 200 },
      direction: 'right',
      isWalking: false
    }
  ]);
  
  const [collectibles, setCollectibles] = useState<Collectible[]>([
    { id: 'gem1', type: 'gem', position: { x: 300, y: 150 } },
    { id: 'flower1', type: 'flower', position: { x: 400, y: 300 } },
    { id: 'gem2', type: 'gem', position: { x: 100, y: 250 } },
  ]);
  
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [lastKey, setLastKey] = useState<string | null>(null);

  // Movimento do jogador
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      const key = e.key;
      setLastKey(key);
      
      setPlayers(prevPlayers => {
        return prevPlayers.map(player => {
          if (player.id === 'player1') {
            let newPosition = { ...player.position };
            let direction = player.direction;
            let isWalking = false;
            
            switch (key) {
              case 'ArrowUp':
                newPosition.y = Math.max(0, player.position.y - step);
                isWalking = true;
                break;
              case 'ArrowDown':
                newPosition.y = Math.min(window.innerHeight - 100, player.position.y + step);
                isWalking = true;
                break;
              case 'ArrowLeft':
                newPosition.x = Math.max(0, player.position.x - step);
                direction = 'left';
                isWalking = true;
                break;
              case 'ArrowRight':
                newPosition.x = Math.min(window.innerWidth, player.position.x + step);
                direction = 'right';
                isWalking = true;
                break;
              default:
                isWalking = false;
            }
            
            // Verificar colisão com colecionáveis
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
              setScore(prev => prev + (collected.type === 'gem' ? 10 : 5));
              setChatMessages(prev => [...prev, `${username} encontrou um(a) ${collected.type === 'gem' ? '💎' : '🌼'}!`]);
              
              // Adicionar novo colecionável após um tempo
              setTimeout(() => {
                setCollectibles(prev => [...prev, {
                  id: `item${Date.now()}`,
                  type: Math.random() > 0.5 ? 'gem' : 'flower',
                  position: {
                    x: Math.random() * (window.innerWidth - 100) + 50,
                    y: Math.random() * (window.innerHeight - 200) + 50
                  }
                }]);
              }, 3000);
            }
            
            return { ...player, position: newPosition, direction, isWalking };
          }
          return player;
        });
      });
    };
    
    const handleKeyUp = () => {
      setPlayers(prevPlayers => {
        return prevPlayers.map(player => {
          if (player.id === 'player1') {
            return { ...player, isWalking: false };
          }
          return player;
        });
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [collectibles, username]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, `${username} (${animal}): ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-green-100 flex-1 relative overflow-hidden">
        {/* Colecionáveis */}
        {collectibles.map(item => (
          <div 
            key={item.id}
            className="absolute text-2xl"
            style={{
              left: `${item.position.x}px`,
              top: `${item.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {item.type === 'gem' ? '💎' : '🌼'}
          </div>
        ))}
        
        {/* Jogadores */}
        {players.map(player => (
          <Avatar 
            key={player.id}
            animal={player.animal}
            position={player.position}
            direction={player.direction}
            isWalking={player.isWalking}
          />
        ))}
        
        {/* Pontuação */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow">
          Pontos: <span className="font-bold">{score}</span>
        </div>
      </div>
      <Chat chatMessages={chatMessages} message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}