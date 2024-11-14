import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Home from './HomeUser/Home';
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
import AdminMangeUser from './components/Admin/AdminPage/AdminMangeUser';
import AllProduct from './components/Products/AllProduct';
import Header from './components/Header';
import EditProduct from './components/Staff/ProductStaffAndAdmin/EditProduct';
import StaffDashboard from './components/Staff/Staff/StaffDashboard';
import CreateProduct from './components/Staff/ProductStaffAndAdmin/CreateProduct';
import PaymentSuccess from './components/Cart/PaymentSuccess';

const clientId="428558537254-k9petgo1lqik4aldtokef39jeibi57l4.apps.googleusercontent.com"
function App() {
  const isAdmin = false;
  const isStaff = false;
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:"openid"
      })
    };
    gapi.load("client:auth2",start);
  })

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Admin/>}>
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="blog" element={<AdminBlog/>} />
            <Route path="product" element={<AdminProduct/>} />
            <Route path="manageUser" element={<AdminMangeUser/>} />
            <Route path="profile" element={<AdminProfile/>} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="create" element={<CreateProduct />} />
            </Route>
          </Routes>
        <Routes>
          <Route path="/staff" element={<Staff />}>
          <Route path="/staff" element={<StaffDashboard/>} />
            <Route path="/staff/follow" element={<StaffFollowProduct />} /> 
            <Route path="/staff/product" element={<StaffProduct />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            <Route path="/staff/edit/:id" element={<EditProduct />} />
            <Route path="/staff/edit/:id" element={<CreateProduct />} />
          </Route>
        </Routes>

        <Routes>
          <Route path='/' element={<Header/>}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />

          <Route path="/shop" element={<Shop />}>
          <Route path="allProduct" element={<AllProduct />} />
            <Route path="newproduct" element={<NewProduct />} />
            <Route path="bonsai" element={<Bonsai />} />
            <Route path="cactus" element={<Cactus />} />
            <Route path="creepers" element={<Creepers />} />
            <Route path="succulent" element={<Succulents />} />
            <Route path="seeds" element={<Seeds />} />
            <Route path="decorateItems" element={<DecorateItem />} />
            <Route path="bestselling" element={<BestSelling />} />
          </Route>

          <Route path="/userlist" element={<UserContainer />}>
            <Route path="user" element={<User />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="orderhistorydetail" element={<OrderHistoryDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="FAQ" element={<FAQ />} />
          </Route>

            <Route path="/newproduct" element={<NewProduct />}/>
            <Route path="/bonsai" element={<Bonsai />} />
            <Route path="/cactus" element={<Cactus />} />
            <Route path="/creepers" element={<Creepers />} />
            <Route path="/succulents" element={<Succulents />} />
            <Route path="/seeds" element={<Seeds />} />
            <Route path="/decorateItem" element={<DecorateItem />} />
            <Route path="/bestselling" element={<BestSelling />} />
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/payment/successfully' element={<PaymentSuccess/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
