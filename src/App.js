import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import Contact from './components/Contact';
import User from './components/User/User';
import Cart from './components/Cart.jsx/Cart';
import Layout from './components/Layout';
import OrderHistory from './components/OrderHistory/OrderHistory';
import OrderHistoryDetail from './components/OrderHistory/OrderHistoryDetail';
import BlogDetail from './components/Blog/BlogDetail';
import Footer from './components/Footer';
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SignIn';
import Bonsai from './components/Products/Bonsai';
import Cactus from './components/Products/Cactus';
import Creepers from './components/Products/Creepers';
import Succulents from './components/Products/Succulents';
import Seeds from './components/Products/Seeds';
import DecorateItem from './components/Products/DecorateItem';
import BestSelling from './components/Products/BestSelling';
import NewProduct from './components/Products/NewProduct';
import Shop from './components/Shop/Shop';
import UserContainer from './components/User/UserContainer';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/shop" element={<Shop />}>
            <Route path="newproduct" element={<NewProduct />} />
            <Route path="bonsai" element={<Bonsai />} />
            <Route path="cactus" element={<Cactus />} />
            <Route path="creepers" element={<Creepers />} />
            <Route path="succulents" element={<Succulents />} />
            <Route path="seeds" element={<Seeds />} />
            <Route path="decorateItem" element={<DecorateItem />} />
            <Route path="bestselling" element={<BestSelling />} />
          </Route>
          <Route path='/userlist' element={<UserContainer/>}>
          <Route path="blogdetail/:id" element={<BlogDetail />} />
          <Route path="user" element={<User />}/>
          <Route path="orderhistory" element={<OrderHistory />}/>
          <Route path="orderhistorydetail" element={<OrderHistoryDetail />}/>
          </Route>
          <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/bonsai" element={<Bonsai />} />
            <Route path="/cactus" element={<Cactus />} />
            <Route path="/creepers" element={<Creepers />} />
            <Route path="/succulents" element={<Succulents />} />
            <Route path="/seeds" element={<Seeds />} />
            <Route path="/decorateItem" element={<DecorateItem />} />
            <Route path="/bestselling" element={<BestSelling />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
