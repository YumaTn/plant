import React from 'react';
import SettingList from './SettingsList';
import { Typography, Box } from '@mui/material';
import NameAndNote from './NameAndNote';
import AccInfBox from './AccInfBox';
import AddressBox from './AddressBox';
import AllOrdersStatus from './AllOrdersStatus'
import HistoryOrderPre from './HistoryOrderPre';
import BrowsingHistory from './BrowsingHistory';
const Dashboard = () => {
  return (
    <>
        <NameAndNote/>
        <Box display='flex'>
        <AccInfBox/>
        <AddressBox/>
        <AllOrdersStatus/>
        </Box>
        <HistoryOrderPre/>
        <BrowsingHistory/>
    </>
  );
}

export default Dashboard;
