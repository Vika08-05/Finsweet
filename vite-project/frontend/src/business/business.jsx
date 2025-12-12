import './business.css'

import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'
import post_poster from '../assets/postposter.png'
import man from '../assets/man.png'
import logo2 from '../assets/logo2.png'
import logo1 from '../assets/logo1.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from "react";


function Business() {

  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [orientations, setOrientations] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // derive posts to display based on selectedCategory
  const filteredPosts = (!apiError && posts)
    ? posts.filter(p => !selectedCategory || (p.label && p.label.toLowerCase() === selectedCategory.toLowerCase()))
    : [];

  return (
    <div>
      <Header />
      <div className="main_block">
        <div className="main_text">
          <h1>Business</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          <label htmlFor="">Blog {'>'} Business</label>
        </div>
      </div>
      
      <div className="mainsection">
        <div className='postSection'>
            <div className='rightBlock'>
                    <div>
          {!apiError && posts.length === 0 && <p>No posts yet.</p>}

          {!apiError && filteredPosts.map((post, idx) => {
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

                         // Note: idx here is the index in the filtered array
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
        <div className="secondsection">
            <div className="categorysection">
                <h1 className='category'>Categories</h1>
                <div className='fourblocks_vertical'>
                    <div
                      className={selectedCategory === 'Business' ? 'active' : ''}
                      onClick={() => setSelectedCategory(selectedCategory === 'Business' ? null : 'Business')}
                    >
                      <img src={logo1} alt="" />
                      <h2>Business</h2>
                    </div>
                    <div
                      className={selectedCategory === 'Startup' ? 'active' : ''}
                      onClick={() => setSelectedCategory(selectedCategory === 'Startup' ? null : 'Startup')}
                    >
                      <img src={logo2} alt="" />
                      <h2>Startup</h2>
                    </div>
                    <div
                      className={selectedCategory === 'Economy' ? 'active' : ''}
                      onClick={() => setSelectedCategory(selectedCategory === 'Economy' ? null : 'Economy')}
                    >
                      <img src={logo3} alt="" />
                      <h2>Economy</h2>
                    </div>
                    <div
                      className={selectedCategory === 'Technology' ? 'active' : ''}
                      onClick={() => setSelectedCategory(selectedCategory === 'Technology' ? null : 'Technology')}
                    >
                      <img src={logo4} alt="" />
                      <h2>Technology</h2>
                    </div>
                </div>
            </div> 
            <div className="tagssection">
                <h1 className='category'>All Tags</h1>
                <div className='tagblocks'>
                    <div className='bus'>
                    <h2>Business</h2>
                    </div>
                    <div className='exp'>
                    <h2>Experience</h2>
                    </div>
                    <div className='scr'>
                    <h2>Screen</h2>
                    </div>
                    <div className='tech'>
                    <h2>Technology</h2>
                    </div>
                    <div className='mark'>
                    <h2>Marketing</h2>
                    </div>
                    <div className='life'>
                    <h2>Life</h2>
                    </div>
                </div>
            </div> 
        </div>            
        </div>

      <Footer />
      </div>
  )
}

export default Business;