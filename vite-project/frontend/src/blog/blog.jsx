import './blog.css'
import poster from '../assets/man_computer.png'
import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'  
import logo4 from '../assets/logo4.png'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'  
import person3 from '../assets/person3.png'  
import person4 from '../assets/person4.png'
import photo1 from '../assets/people.png'
import sponsors from '../assets/Logo component.png'
import manphoto from '../assets/man.png'

import Header from '../header/header.jsx'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

function Blog() {

  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [orientations, setOrientations] = useState({});

  useEffect(() => {
  fetch('http://localhost:4000/api/data')
      .then(res => res.json())
      .then(data => {
        console.log('DATA:', data);
        setPosts(Array.isArray(data) ? data : []);
        setApiError(null);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setPosts([]);
        setApiError(err.message || 'Network error');
      });
  }, []);

  const slides = [
    {
      left: {
        h4: "TESTIMONIALs",
        h1: "What people say about our blog",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      },
      right: {
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur incidunt accusantium similique consequuntur laboriosam voluptate ut temporibus, esse cum omnis autem mollitia. "
      }
    },
    {
      left: {
        h4: "Our vision",
        h1: "We believe in creative freedom for everyone",
        p: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        btn: "Learn more"
      },
      right: {
        p: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"
      }
    }
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <Header />
      <div className="main_block">
        <div className="main_phototext">
          <h3>Posted on startup</h3>
          <h1>Step-by-step guide to choosing great font pairs</h1>
          <h4> By<span> James West </span>  |  May 23, 2022 </h4>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          <button className="yellow-button">Read More &gt;</button>
        </div>
        <img src={poster} className="man_computer"/>
      </div>
      
      <div className='postSection'>
          <div className='rightBlock'>
              <h2 className='allpost'>All Posts</h2>
              <hr />
                <div>
                  {apiError && (
                    <div className="api-error" style={{ color: 'red' }}>
                      Error loading posts: {apiError}
                    </div>
                  )}

                  {!apiError && posts.length === 0 && <p>No posts yet.</p>}

                  {!apiError && posts.map((post, idx) => (
                    <div key={idx} className="singlepost">
                        {post.raw.photo && (
                          <div
                            className="post-image"
                            style={{ width: 780, height: 318, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                          >
                            <img
                              src={post.raw.photo.trim()}
                              alt={post.label}
                              onLoad={(e) => {
                                const { naturalWidth, naturalHeight } = e.target;
                                setOrientations(prev => ({ ...prev, [idx]: naturalHeight > naturalWidth ? 'portrait' : 'landscape' }));
                              }}
                              style={orientations[idx] === 'portrait'
                                ? { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }
                                : { maxWidth: '100%', height: '100%', objectFit: 'cover' }
                              }
                              onError={() => console.log("ERROR LOADING:", post.raw.photo)}
                            />
                          </div>
                        )}

                        <div className="infoblock">
                          <h3 className="post-label">{post.label}</h3>
                          <h2>{post.www}</h2>
                          <p>{post.description || ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
      </div>
      
          <h1 className='category'>Choose A Category</h1>
          <div className='fourblocks'>
            <div>
              <img src={logo1} alt="" />
              <h2>Business</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
            <div>
              <img src={logo2} alt="" />
              <h2>Startup</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
            <div>
              <img src={logo3} alt="" />
              <h2>Economy</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
            <div>
              <img src={logo4} alt="" />
              <h2>Technology</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
          </div>

          <div className="joinblock">
            <h2>Join our team to be a part of our story</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ad et obcaecati quaerat nam ea.</p>
            <button className="yellow-button">Join Now</button>
          </div>

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
      </div>
  )
}

export default Blog;