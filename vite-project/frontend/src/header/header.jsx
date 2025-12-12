import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {

    const [open, setOpen] = useState(false);
    
    return (
    <header>
        <div className="header-container">
            <h1>Finsweet</h1>
            {!open && (
                <div className="burger" onClick={() => setOpen(true)}>
                        <div className="lines">
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </div>
                )}
            {/* Desktop / default navigation - always rendered (hidden by CSS on small screens) */}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/subscribe">Subscribe</Link></li>
            </ul>

            {/* Mobile menu shown when open=true */}
            {open && (
                <div className="mobile-menu">
                    <div className="close-button" onClick={() => setOpen(false)}>X</div>
                    <ul>
                        <li onClick={() => setOpen(false)}><Link to="/">Home</Link></li>
                        <li onClick={() => setOpen(false)}><Link to="/blog">Blog</Link></li>
                        <li onClick={() => setOpen(false)}><Link to="/about">About Us</Link></li>
                        <li onClick={() => setOpen(false)}><Link to="/contact">Contact Us</Link></li>
                        <li onClick={() => setOpen(false)}><Link to="/subscribe">Subscribe</Link></li>
                    </ul>
                </div>
            )}
        </div>
      </header>
    );
}
export default Header;