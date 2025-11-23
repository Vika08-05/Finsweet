import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import './footer.css';

    const Footer = () => (
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
                <div className="rightsubscribe">
                  <input type="email" placeholder="Enter your email" />
                  <button className="yellow-button">Subscribe</button>
                </div>
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
export default Footer;