import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Main/App'
import Blog from './blog/blog'
import ContactUs from './contact_us/contact';
import About from './about/about';
import Business from './business/business';
import Post from './post/post';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/business" element={<Business />} />
      <Route path="/post" element={<Post />} />

    </Routes>
  </BrowserRouter>
)
