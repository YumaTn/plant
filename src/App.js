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

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/user"
            element={
              <Box display="flex">
                <Box flex={1} sx={{ flexBasis: '20%', }}>
                  <SettingList />
                </Box>
                <Box flex={3} sx={{ flexBasis: '80%', marginTop:'125px',marginLeft:4 }}>
                  <User />
                </Box>
              </Box>
            }
          />

          <Route
            path="/orderhistory"
            element={
              <Box display="flex">
                <Box flex={1} sx={{ flexBasis: '20%' }}>
                  <SettingList />
                </Box>
                <Box flex={3} sx={{ flexBasis: '80%', marginTop:'110px',marginLeft:4,marginRight:5 }}>
                  <OrderHistory/>
                </Box>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
