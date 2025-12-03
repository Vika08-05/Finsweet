import './post.css'

import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'
import post_poster from '../assets/postposter.png'
import man from '../assets/man.png'
import logo2 from '../assets/logo2.png'
import { useRef, useState, useEffect } from "react";


function Post() {

  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [orientations, setOrientations] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // show 3 posts per page

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

return (
    <div>
      <Header />
      <div className="body">
        <div className="topinfo">
      <div className="person">
        <img src={man} alt="" className='icon'/>
        <div className="person-info">
          <h4 className="name">Andrew Jonson</h4>
          <label htmlFor="" className="date">Posted on 27th January 2022</label>
        </div>
      </div>
            
            <h1 className="name">Logo design trends to avoid in 2022</h1>
        <div className="tag">
            <img src={logo2} alt="" />
            <label htmlFor="">Startup</label>
        </div> 
        </div>
        
        <div className="postcontent">
            <img src={post_poster} alt="" className='postposter'/>
            </div>  
        <div className="text">
           <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas excepturi dolores veniam, corporis minima vero? Inventore magni similique deserunt alias libero eius expedita, quidem esse ad iusto. Perspiciatis asperiores expedita cum consectetur eius corrupti et rem recusandae autem obcaecati, nostrum assumenda, laboriosam placeat velit dolorum veritatis magni enim explicabo! Corrupti?</p>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, quae ab ducimus sint tempora asperiores ex error doloremque provident necessitatibus reiciendis ratione laborum doloribus culpa obcaecati illum cupiditate optio earum corrupti vero non, aspernatur quam minus nostrum! Harum eligendi dolorum quibusdam aut odit aspernatur, tenetur magni tempora, quo ea, omnis a vel? Ducimus officia, unde ut cupiditate voluptatem quisquam eum!</p>
        <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Non blandit massa enim nec scelerisque</li>
            <li>Neque egestas congue quisque egestas</li>
        </ul>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil sapiente perferendis saepe ea, nisi libero iste provident alias laboriosam facilis autem accusantium sint blanditiis enim officia expedita? Sit iusto voluptatem, quia sed fuga quo, deleniti harum beatae, officiis tenetur blanditiis!</p>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima velit similique aliquid.</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus aliquid nam fuga aut inventore exercitationem iste in optio reiciendis? Laudantium commodi incidunt corporis, expedita itaque amet accusamus placeat fugiat quisquam distinctio facere dolorum aut dignissimos! Qui expedita suscipit fuga quidem.</p>
        </div>
      </div>
                {!apiError && (
                  <>
                    <div className="posts-grid">
                      {posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post, idx) => (
                        <div key={(currentPage - 1) * postsPerPage + idx} className="postgrid">
                        {post.raw.photo && (
                          <div
                            className="post-image"
                            style={{ height: 318, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                          >
                            <img
                              src={post.raw.photo.trim()}
                              alt={post.label}
                              onLoad={(e) => {
                                const { naturalWidth, naturalHeight } = e.target;
                                setOrientations(prev => ({ ...prev, [idx]: naturalHeight > naturalWidth ? 'portrait' : 'landscape' }));
                              }}
                              style={orientations[idx] === 'portrait'
                                ? { width: '80%', height: '100%', objectFit: 'cover', objectPosition: 'center' }
                                : { maxWidth: '80%', height: '100%', objectFit: 'cover' }
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

                    {/* Pagination controls */}
                    {posts.length > postsPerPage && (
                      <div className="pagination">
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              className={page === currentPage ? 'page active' : 'page'}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
          <div className="joinblock">
            <h2>Join our team to be a part of our story</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ad et obcaecati quaerat nam ea.</p>
            <button className="yellow-button">Join Now</button>
          </div>
          <Footer />
      </div>
  )
}

export default Post;