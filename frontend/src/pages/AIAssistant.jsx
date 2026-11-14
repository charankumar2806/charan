import { useState } from 'react';
import { chatWithAI } from '../services/ai.service';

const suggested = ['Which route is most eco-friendly?', 'Which roads have high congestion?', 'How can fleet efficiency improve?'];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'I can help with route advice, emissions trends, traffic risk, and mobility strategy. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;
    setMessages((current) => [...current, { sender: 'user', text: message }]);
    setInput('');
    const { data } = await chatWithAI({ prompt: message });
    setMessages((current) => [...current, { sender: 'assistant', text: data.answer || 'No answer available.' }]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
      <div className="card">
        <h2 className="text-xl font-semibold">AI mobility assistant</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggested.map((item) => (
            <button key={item} className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-sm text-slate-200" onClick={() => setInput(item)}>{item}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
          {messages.map((message, index) => (
            <div key={`${message.sender}-${index}`} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${message.sender === 'assistant' ? 'bg-blue-500/10 text-blue-100' : 'ml-auto bg-slate-800 text-slate-100'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about congestion, emissions, routes, or city operations" />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
