import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import Contact from './components/Contact';
import User from './components/User/User';
import Cart from './components/Cart.jsx/Cart';
import Layout from './components/Layout';
import OrderHistory from './components/OrderHistory/OrderHistory';
import { Box } from '@mui/material';
import SettingList from './components/User/SettingsList';
import OrderHistoryDetail from './components/OrderHistory/OrderHistoryDetail';
import ShopProductBanner from './components/Shop/ShopProductBanner';
import FilterPlant from './components/Shop/FilterPlant';
import ShopProduct from './components/Shop/ShopProduct';
import BlogProductBanner from './components/Blog/BlogBanner';
import BlogDetail from './components/Blog/BlogDetail';
import Footer from './components/Footer';

const ShopPage = () => {
  return (
    <Box>
      <ShopProductBanner />
      <Box display="flex" marginTop={2}>
        <Box flex={1} sx={{ flexBasis: '20%' }}>
          <FilterPlant />
        </Box>
        <Box flex={3} sx={{ flexBasis: '80%', marginLeft: 4, marginTop: '100px' }}>
          <ShopProduct />
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<ShopPage />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/user"
            element={
              <Box display="flex">
                <Box flex={1} sx={{ flexBasis: '20%' }}>
                  <SettingList />
                </Box>
                <Box flex={3} sx={{ flexBasis: '80%', marginTop: '125px', marginLeft: 4 }}>
                  <User />
                </Box>
              </Box>
            }
          />
          <Route path="/orderhistory"
            element={
              <Box display="flex">
                <Box flex={1} sx={{ flexBasis: '20%' }}>
                  <SettingList />
                </Box>
                <Box flex={3} sx={{ flexBasis: '80%', marginTop: '110px', marginLeft: 4, marginRight: 5 }}>
                  <OrderHistory />
                </Box>
              </Box>
            }
          />
          <Route path="/orderhistorydetail"
            element={
              <Box display="flex">
                <Box flex={1} sx={{ flexBasis: '20%' }}>
                  <SettingList />
                </Box>
                <Box flex={3} sx={{ flexBasis: '80%', marginTop: '80px', marginLeft: 4, marginRight: 5 }}>
                  <OrderHistoryDetail />
                </Box>
              </Box>
            }
          />
        </Routes>
        <Footer/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
