import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Home from './HomeUser/Home';
import Contact from './components/Contact/Contact';
import User from './components/User/User';
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
import Profile from './components/User/Profile';
import FAQ from './components/FAQ/FAQ';
import ProductDetail from './components/Products/ProductDetail';
import Cart from './components/Cart/Cart'
import Payment from './components/Cart/Payment';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import AdminDashboard from './components/Admin/AdminPage/AdminDashboard';
import AdminBlog from './components/Admin/AdminPage/AdminBlog';
import AdminProduct from './components/Admin/AdminPage/AdminProduct';
import AdminProfile from './components/Admin/AdminPage/AdminProfile';
import Admin from './components/Admin/AdminNavbar/Admin';
import StaffFollowProduct from './components/Staff/Staff/StaffFollowProduct';
import StaffProduct from './components/Staff/Staff/StaffProduct';
import StaffProfile from './components/Staff/Staff/StaffProfile';
import Staff from './components/Staff/StaffNavbar/Staff';

const clientId="428558537254-k9petgo1lqik4aldtokef39jeibi57l4.apps.googleusercontent.com"

function App() {
  const isAdmin = false;
  const isStaff = true;
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    gapi.load("client:auth2",start);
  })

  return (
    <BrowserRouter>
    {isAdmin ? (
          <Routes>
            <Route path="/" element={<Admin/>}>
            <Route path="/" element={<AdminDashboard/>} />
            <Route path="/admin/blog" element={<AdminBlog/>} />
            <Route path="/admin/product" element={<AdminProduct/>} />
            <Route path="/admin/profile" element={<AdminProfile/>} />
            </Route>
          </Routes>
      ) : isStaff ? (
        <Routes>
          <Route path="/" element={<Staff />}>
            <Route path="/" element={<StaffFollowProduct />} /> 
            <Route path="/staff/product" element={<StaffProduct />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
          </Route>
        </Routes>
      ) :(
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />

          <Route path="/shop" element={<Shop />}>
            <Route path="newproduct" element={<NewProduct />} />
            <Route path="bonsai" element={<Bonsai />} />
            <Route path="cactus" element={<Cactus />} />
            <Route path="creepers" element={<Creepers />} />
            <Route path="succulent" element={<Succulents />} />
            <Route path="seeds" element={<Seeds />} />
            <Route path="decorateItem" element={<DecorateItem />} />
            <Route path="bestselling" element={<BestSelling />} />
          </Route>

          <Route path="/userlist" element={<UserContainer />}>
            <Route path="user" element={<User />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="orderhistorydetail" element={<OrderHistoryDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="FAQ" element={<FAQ />} />
          </Route>

          <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/bonsai" element={<Bonsai />} />
            <Route path="/cactus" element={<Cactus />} />
            <Route path="/creepers" element={<Creepers />} />
            <Route path="/succulents" element={<Succulents />} />
            <Route path="/seeds" element={<Seeds />} />
            <Route path="/decorateItem" element={<DecorateItem />} />
            <Route path="/bestselling" element={<BestSelling />} />
            <Route path='/payment' element={<Payment/>}/>
        </Routes>
        <Footer />
      </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
