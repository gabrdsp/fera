// src/pages/LoginPage.tsx
import { useState } from "react";

interface LoginPageProps {
  username: string;
  setUsername: (name: string) => void;
  animal: string;
  setAnimal: (animal: string) => void;
  onLogin: () => void;
}

export default function LoginPage({ username, setUsername, animal, setAnimal, onLogin }: LoginPageProps) {
  const animals = [
    { name: 'Águia', emoji: '🦅' },
    { name: 'Urso', emoji: '🐻' },
    { name: 'Tigre', emoji: '🐯' },
    { name: 'Lobo', emoji: '🐺' },
    { name: 'Raposa', emoji: '🦊' },
    { name: 'Coelho', emoji: '🐰' },
    { name: 'Panda', emoji: '🐼' },
    { name: 'Cavalo', emoji: '🐴' },
  ];

  const [showAnimalSelection, setShowAnimalSelection] = useState(false);

  const handleLogin = () => {
    if (username.trim() && animal) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-2">FERA</h1>
        <p className="text-gray-600">Um mundo de aventuras animais!</p>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Nome de usuário
          </label>
          <input
            id="username"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Seu animal
          </label>
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center gap-2 border rounded-lg px-4 py-2 w-full text-left"
              onClick={() => setShowAnimalSelection(!showAnimalSelection)}
            >
              <span className="text-2xl">{animals.find(a => a.name === animal)?.emoji}</span>
              <span>{animal || "Escolha seu animal"}</span>
            </button>
          </div>
          
          {showAnimalSelection && (
            <div className="mt-2 grid grid-cols-4 gap-2">
              {animals.map((a) => (
                <button
                  key={a.name}
                  className="p-2 rounded-lg flex flex-col items-center"
                  onClick={() => {
                    setAnimal(a.name);
                    setShowAnimalSelection(false);
                  }}
                >
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="text-xs">{a.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className={`w-full py-3 rounded-lg text-white font-bold transition ${username.trim() && animal ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={handleLogin}
          disabled={!username.trim() || !animal}
        >
          Entrar no Jogo
        </button>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-4">
        <p>Versão Beta - By @Gabrdsp</p>
        <p className="mt-1">Use as setas para se mover e converse com amigos!</p>
      </div>
    </div>
  );
}
