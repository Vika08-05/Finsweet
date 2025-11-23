import './blog.css'
import poster from '../assets/poster.png'
import leftphoto from '../assets/leftphoto.png'
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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


function Blog() {

  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Convert s3://bucket/key to HTTPS URL for public buckets
  function s3ToHttps(s3uri, region = 'us-east-1') {
    if (!s3uri) return null;
    const uri = String(s3uri).trim();
    const m = uri.match(/^s3:\/\/([^\/]+)\/(.+)$/);
    if (!m) return null;
    const bucket = m[1];
    const key = m[2];
    const encodedKey = key.split('/').map(encodeURIComponent).join('/');
    return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
  }

  useEffect(() => {
  fetch('http://localhost:4000/api/data')
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);
        if (Array.isArray(data)) {
          setPosts(data);
          setApiError(null);
        } else if (data && data.error) {
          // backend returned an error object
          console.error('API error:', data.error);
          setPosts([]);
          setApiError(data.error);
        } else if (data && Array.isArray(data.Items)) {
          // raw DynamoDB-style response
          setPosts(data.Items);
          setApiError(null);
        } else {
          console.warn('Unexpected API response:', data);
          setPosts([]);
          setApiError('Unexpected API response');
        }
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
      <header>
        <div className="header-container">
          <h1>Finsweet</h1>
          <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Subscribe</li>
          </ul>
        </div>
      </header>
      <div className="phototext">
        <h3>Posted on startup</h3>
        <h1>Step-by-step guide to choosing great font pairs</h1>
        <h4> By<span> James West </span>  |  May 23, 2022 </h4>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        <button className="yellow-button">Read More</button>
      </div>
      <img src={poster} className="poster"/>
      <div className='mainBlock'>
          <div className='rightBlock'>
              <h2>All Posts</h2>
                <div className="allposts">
                  {apiError && (
                    <div className="api-error" style={{ color: 'red' }}>
                      Error loading posts: {apiError}
                    </div>
                  )}

                  {!apiError && posts.length === 0 && <p>No posts yet.</p>}

                  {!apiError && posts.map(post => (
                    <div key={post.www || post.label || Math.random()}>
                      <h2>{post.label || post.www || 'Untitled'}</h2>
                      <p>{post.description || ''}</p>
                      {post.raw?.photo && (
                        <img
                          src={s3ToHttps(post.raw.photo, 'us-east-1')}
                          style={{ maxWidth: "300px", borderRadius: "8px" }}
                          alt={post.label || ''}
                        />
                      )}
                    </div>
                  ))}
                </div>
          </div>
      </div>
      <div className="centerdiv">
        <div className="textblocks">
            <div>
              <h4>About Us</h4>
              <h2>We are a community of content writers who share their learnings</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button className="purple-button">Read More</button>
            </div>
            <div>
              <h4>Our Mission</h4>
              <h2>Creating valuable content for creatives all around the world</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="colorblocks">
                <div></div>
                <div></div>
                <div></div>
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
          <div className="phototextblock">
            <div className="leftside">
              <img src={photo1} alt="" />
            </div>
            <div className="rightside">
              <h4>Why we started  </h4>
              <h1>It started out as a simple idea and evolved into our passion</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <button className="yellow-button">Discover our story</button>
            </div>
          </div>
          <h1 className='category'>List of authors</h1>
          <div className='fourpeople'>
            <div className='firstperson'>
              <img src={person1} alt="" />
              <h2>Floyd Miles</h2>
              <p>Content Writer @Company</p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='secondperson'>
              <img src={person2} alt="" />
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div>
              <img src={person3} alt="" />
              <h2>Jenny Wilson</h2>
              <p>Content Writer @Company</p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div>
              <img src={person4} alt="" />
              <h2>Leslie Alexander</h2>
              <p>Content Writer @Company</p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
          </div>
          <img src={sponsors} alt="" className='sponsors' />

          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, idx) => (
              <div key={idx}>
                <div className="slides">
                  <div className="leftsideslide">
                    <h4>{slide.left.h4}</h4>
                    <h3>{slide.left.h1}</h3>
                    <p>{slide.left.p}</p>
                  </div>
                  <div className="rightsideslide">
                    <p>{slide.right.p}</p>
                    <div className="info">
                      <div className="maninfo">
                        <div className="photo">
                          <img src={manphoto} className="manphoto" alt="" />
                        </div>
                        <div className="text">
                          <h5>Jonathan Vallem</h5>
                          <p>New york, USA</p>
                        </div>
                      </div>
                      <div className="slider-arrows">
                        <FaArrowAltCircleLeft style={{ fontSize: '30px', color: 'grey', cursor: 'pointer' }} onClick={() => sliderRef.current.slickPrev()} />
                        <FaArrowAltCircleRight style={{ fontSize: '30px', color: 'grey', cursor: 'pointer' }} onClick={() => sliderRef.current.slickNext()} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

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