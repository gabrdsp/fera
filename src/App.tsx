import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [animal, setAnimal] = useState('');

  if (!loggedIn) {
    return <LoginPage username={username} setUsername={setUsername} animal={animal} setAnimal={setAnimal} onLogin={() => setLoggedIn(true)} />;
  }

  return <GamePage username={username} animal={animal} />;
}
