

import { useState } from 'react';

function Card({ title, children }) {
  return (
    <div className="bg-white shadow-md rounded-xl w-full max-w-xl p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Button({ onClick, children, variant = 'primary' }) {
  const base =
'px-4 py-2 rounded-md text-white font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? `${base} bg-blue-600 hover:bg-blue-700`
      : `${base} bg-red-600 hover:bg-red-700`;
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded-md w-full ${className}`}
    />
  );
}

export default function URLHistoryApp() {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [limit, setLimit] = useState(5);

  const handleAddUrl = () => {
    if (!url) return;

    setHistory((prev) => {
      const existing = prev.find((item) => item.url === url);
      if (existing) {
        return prev.map((item) =>
          item.url === url
            ? { ...item, count: item.count + 1, timestamp: new Date() }
            : item
        );
      } else {
        return [
          { url, timestamp: new Date(), count: 1 },
          ...prev,
        ];
      }
    });
    setUrl('');
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const displayedUrls = [...history]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <Card title="URL Input">
        <div className="flex gap-2">
          <Input
            placeholder="Enter new URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleAddUrl}>Visit</Button>
        </div>
      </Card>

      <Card title="Settings">
        <div className="flex gap-4 items-center">
          <label className="text-sm">Max URLs to Display:</label>
          <Input
            type="number"
            min="1"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-20"
          />
          <Button variant="danger" onClick={handleClearHistory}>
            Clear History
          </Button>
        </div>
      </Card>

      <Card title="Recent URLs">
        {displayedUrls.length === 0 ? (
          <p className="text-gray-500">No URLs added yet.</p>
        ) : (
          <ul className="space-y-2">
            {displayedUrls.map((item, index) => (
              <li
                key={index}
                className="p-3 rounded-lg bg-gray-50 border shadow-sm flex flex-col"
              >
                <span className="font-medium">{item.url}</span>
                <span className="text-sm text-gray-600">
                  Visited {item.count} time{item.count > 1 ? 's' : ''} |{' '}
                  {item.timestamp.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
