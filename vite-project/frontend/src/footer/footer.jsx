import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import './footer.css';

    const Footer = () => {
        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState(null);
        const [error, setError] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();
            const trimmed = email.trim();
            if (!trimmed) return;

            setLoading(true);
            setSuccess(null);
            setError(null);

            try {
                const res = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: trimmed,
                        subject: 'Subscribe request',
                        message: `${trimmed} хоче підписатись на новини.`,
                    })
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
                    setSuccess('Request sent!');
                    setEmail('');
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
            <div className="footer">
                <div className="footer-container">
                    <h1>Finsweet</h1>
                    <ul>
                      <li>Home</li>
                      <li>Blog</li>
                      <li>About Us</li>
                      <li>Contact Us</li>
                      <li>Privacy Policy</li>
                    </ul>
                  </div>
                  <div className="subscribeblock">
                    <div className="leftsubscribe">
                      <h1>Subscribe to our news letter to get latest updates and news</h1>
                    </div>
                    <form className="rightsubscribe" onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="yellow-button" type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Subscribe'}
                      </button>
                    </form>
                    {success && <p className="subscribe-feedback">{success}</p>}
                    {error && <p className="subscribe-feedback">{error}</p>}
                  </div>
                  <div className="security">
                    <div className="datenschutz">
                      <p>Finstreet 118 2561 Fintown</p>
                      <p>Hello@finsweet.com  020 7993 2905</p>
                    </div>
                    <div className="icons">
                      <FaFacebookF style={{ fontSize: '20px', color: 'grey' }} />
                      <FaLinkedinIn style={{ fontSize: '20px', color: 'grey' }} />
                      <FaInstagram style={{ fontSize: '20px', color: 'grey' }} />
                      <FaTwitter style={{ fontSize: '20px', color: 'grey' }} />
                    </div>
                  </div>
            </div>
    );
};
export default Footer;