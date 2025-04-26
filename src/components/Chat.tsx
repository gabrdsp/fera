interface ChatProps {
  chatMessages: string[];
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
}

export default function Chat({ chatMessages, message, setMessage, sendMessage }: ChatProps) {
  return (
    <>
      <div className="bg-white p-4 border-t h-48 overflow-y-auto">
        {chatMessages.map((msg, i) => (
          <div key={i} className="text-sm text-gray-700 mb-1">{msg}</div>
        ))}
      </div>
      <div className="flex p-2 border-t gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </>
  );
}