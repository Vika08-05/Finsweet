import './blog.css'
import poster from '../assets/man_computer.png'
import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'  
import logo4 from '../assets/logo4.png'

import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Blog() {

  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [orientations, setOrientations] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/api/data')
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const message = data?.detail || data?.error || `HTTP ${res.status}`;
          throw new Error(message);
        }
        return data;
      })
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

                  {!apiError && posts.length === 0 && <p>No posts yet.</p>}

                  {!apiError && posts.map((post, idx) => {
                    const inner = (
                      <>
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
                                : { maxWidth: '100%', objectFit: 'cover' }
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
                      </>
                    );

                    if (idx === 0) {
                      return (
                        <Link key={idx} to={`/post`} className="post-link">
                          <div className="singlepost">{inner}</div>
                        </Link>
                      );
                    }

                    return (
                      <div key={idx} className="singlepost">{inner}</div>
                    );
                  })}
                </div>
          </div>
      </div>
      
          <h1 className='category'>Choose A Category</h1>
          <div className='fourblocks'>
            <Link to="/blog/business" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <img src={logo1} alt="" />
                <h2>Business</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Link>
            <Link to="/blog/startup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <img src={logo2} alt="" />
                <h2>Startup</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Link>
            <Link to="/blog/economy" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <img src={logo3} alt="" />
                <h2>Economy</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Link>
            <Link to="/blog/technology" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <img src={logo4} alt="" />
                <h2>Technology</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Link>
          </div>

          <div className="joinblock">
            <h2>Join our team to be a part of our story</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ad et obcaecati quaerat nam ea.</p>
            <button className="yellow-button">Join Now</button>
          </div>

          <Footer />
      </div>
  )
}

export default Blog;