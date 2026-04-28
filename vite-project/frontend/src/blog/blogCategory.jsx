import './blog.css'
import poster from '../assets/man_computer.png'

import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'

import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

function normalizeCategory(value) {
  return String(value || '').trim().toLowerCase();
}

function titleCaseFromSlug(slug) {
  const clean = String(slug || '').trim();
  if (!clean) return '';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function BlogCategory() {
  const { category } = useParams();
  const categorySlug = normalizeCategory(category);
  const categoryTitle = titleCaseFromSlug(categorySlug);

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
        setPosts(Array.isArray(data) ? data : []);
        setApiError(null);
      })
      .catch(err => {
        setPosts([]);
        setApiError(err.message || 'Network error');
      });
  }, []);

  const filteredPosts = posts.filter(p => {
    const postCategory = p?.categorySlug || p?.category || p?.label;
    return normalizeCategory(postCategory) === categorySlug;
  });

  return (
    <div>
      <Header />

      <div className="main_block">
        <div className="main_phototext">
          <h3>Category</h3>
          <h1>{categoryTitle || 'Category'}</h1>
          <h4>
            <Link to="/blog">Blog</Link>
            {' > '}
            <span>{categoryTitle || 'Category'}</span>
          </h4>
          <p>Showing posts from AWS that match this category.</p>
        </div>
        <img src={poster} className="man_computer" />
      </div>

      <div className='postSection'>
        <div className='rightBlock'>
          <h2 className='allpost'>All Posts</h2>
          <hr />

          {apiError && (
            <p style={{ paddingTop: 20 }}>
              Failed to load posts: {apiError}
            </p>
          )}

          {!apiError && filteredPosts.length === 0 && (
            <p style={{ paddingTop: 20 }}>No posts in this category yet.</p>
          )}

          {!apiError && filteredPosts.map((post, idx) => {
            const inner = (
              <>
                {post.raw?.photo && (
                  <div
                    className="post-image"
                    style={{ width: 780, height: 318, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                  >
                    <img
                      src={String(post.raw.photo).trim()}
                      alt={post.label}
                      onLoad={(e) => {
                        const { naturalWidth, naturalHeight } = e.target;
                        setOrientations(prev => ({
                          ...prev,
                          [idx]: naturalHeight > naturalWidth ? 'portrait' : 'landscape'
                        }));
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

      <Footer />
    </div>
  )
}

export default BlogCategory;
