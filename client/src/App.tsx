import NoticeCard from "./components/NoticeCard";
import { useEffect, useState } from 'react';
import './App.css';

interface Notice {
  _id?: string;
  title: string;
  message: string;
  createdAt?: string;
}

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notices');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const addNotice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      if (!response.ok) {
        alert('Could not add notice. Please check the backend.');
        return;
      }

      setTitle('');
      setMessage('');
      await fetchNotices();
      alert('Notice added successfully!');
    } catch (error) {
      console.error(error);
      alert('Cannot connect to the backend.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Department Notice Board</h1>
        <p>Stay updated with department announcements</p>
      </header>

      <main>
        <section className="notice-form">
          <h2>Add a Notice</h2>
          <form onSubmit={addNotice}>
            <input
              type="text"
              placeholder="Notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Notice message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">Post Notice</button>
          </form>
        </section>

<div className="notices-list">
  {notices.map((notice) => (
    <NoticeCard
      key={notice._id}
      title={notice.title}
      message={notice.message}
      createdAt={notice.createdAt}
    />
  ))}
</div>
      </main>
    </div>
  );
}

export default App;
