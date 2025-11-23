import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
    <header>
        <div className="header-container">
            <h1>Finsweet</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/subscribe">Subscribe</Link></li>
            </ul>
        </div>
      </header>
);
export default Header;