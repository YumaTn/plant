import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import Contact from './components/Contact';
import User from './components/User/User';
import Cart from './components/Cart.jsx/Cart';
import Layout from './components/Layout';
function App() {
  return (
    <BrowserRouter>
        <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
