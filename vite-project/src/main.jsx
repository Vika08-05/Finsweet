import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Main/App'
import Blog from './blog/blog'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  </BrowserRouter>
)
