import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './subscribe.css';

function Subscribe() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Subscribe request',
          message: `${form.name ? form.name + ' ' : ''}${form.email} хоче підписатись на новини.`,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const message = [data?.error, data?.detail].filter(Boolean).join(': ');
        setError(message || `Request failed (${res.status})`);
      } else if (data?.success) {
        setSuccess('Subscribed request sent!');
        setForm({ name: '', email: '' });
      } else {
        const message = [data?.error, data?.detail].filter(Boolean).join(': ');
        setError(message || 'Failed to subscribe');
      }
    } catch (err) {
      setError(err?.message || 'Error sending request');
    }

    setLoading(false);
  };

  return (
    <div className="subscribe-page">
      <Header />

      <main className="subscribe-main">
        <h1 className="subscribe-title">Subscribe</h1>
        <p className="subscribe-subtitle">Leave your email — and I'll get back to you.</p>

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            className="subscribe-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name (optional)"
          />

          <input
            className="subscribe-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />

          <button className="subscribe-button" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Subscribe'}
          </button>

          {success && <p className="subscribe-success">{success}</p>}
          {error && <p className="subscribe-error">{error}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Subscribe;
