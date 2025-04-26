interface LoginPageProps {
  username: string;
  setUsername: (name: string) => void;
  animal: string;
  setAnimal: (animal: string) => void;
  onLogin: () => void;
}

export default function LoginPage({ username, setUsername, animal, setAnimal, onLogin }: LoginPageProps) {
  const animals = ['Águia', 'Urso', 'Tigre', 'Lobo'];

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Bem-vindo ao FERA</h1>
      <input className="border rounded px-4 py-2" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <select className="border rounded px-4 py-2" value={animal} onChange={(e) => setAnimal(e.target.value)}>
        {animals.map((a) => (<option key={a}>{a}</option>))}
      </select>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onLogin}>Entrar</button> 
      <h2>Versão Beta - By @Gabrdsp</h2>
    </div>
  );
}