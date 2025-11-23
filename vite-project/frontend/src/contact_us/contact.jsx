import React, { useState } from "react";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import './contact.css';

const ContactUs = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: form.email,
                    subject: form.subject || 'Contact Form',
                    text: `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
                })
            });
            const data = await res.json();
            if (data.success) setSuccess('Message sent!');
            else setError(data.error || 'Failed to send');
        } catch (err) {
            setError('Error sending message');
        }
        setLoading(false);
    };
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Contact Us</h3>
            <section style={{ maxWidth: 800, margin: "2rem auto", width: "95vw" }}>
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h1>Let's Start a Conversation</h1>
                    <p style={{ maxWidth: 500, margin: "1rem auto"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, enim erat dictum urna, nec gravida.
                    </p>
                    </div>
                <div>
                    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                        {/* Working Hours Block */}
                        <div style={{
                            flex: 1,
                            background: "#592EA9",
                            borderRadius: "16px",
                            padding: "2rem",
                            marginBottom: "2rem",
                            color: "#fff",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.05)"
                        }}>
                            <h5>Working Hours</h5>
                            <hr />
                            <p>Monday to Friday: 9am - 8pm</p>
                            <p>Our support team is available 24/7</p>
                            <p>Contact us: <b>02079932905</b></p>
                        </div>
                        <div style={{
                            flex: 1,
                            background: "#592EA9",
                            borderRadius: "16px",
                            padding: "2rem",
                            marginBottom: "2rem",
                            color: "#fff",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.05)"
                        }}>
                            <h5>Contact Us</h5>
                            <hr />
                            <p>Contact us: <b>02079932905</b></p>
                            <p>hello@example.com</p>
                        </div>  
                    </div>
                    
                    {/* Input Fields Block */}
                    <div style={{
                        flex: 1,
                        borderRadius: "16px",
                        padding: "2rem",
                        color: "#333",
                    }}>
                            <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #ddd",
                                    outline: "none",
                                    background: "#fff"
                                }}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #ddd",
                                    outline: "none",
                                    background: "#fff"
                                }}
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Query Related"
                                value={form.subject}
                                onChange={handleChange}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #ddd",
                                    outline: "none",
                                    background: "#fff"
                                }}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                style={{
                                    padding: "0.75rem",
                                    border: "1px solid #ddd",
                                    outline: "none",
                                    resize: "vertical",
                                    background: "#fff"
                                }}
                                required
                            />
                            <button
                                type="submit"
                                style={{
                                    background: "#FFD050",
                                    color: "#333",
                                    fontWeight: "bold",
                                    padding: "0.75rem",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    marginTop: "0.5rem",
                                }}
                                disabled={loading}
                            >
                            {loading ? "Sending..." : "Send Message"}
                            </button>
                            {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
                            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ContactUs;