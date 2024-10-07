import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    Container,
    Paper,
    Typography,
    Divider,
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    Box,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Table,
    stepConnectorClasses,
} from '@mui/material';
import { CompleteIcon, ConfirmIcon, Done, InWay, LocalIcon, UserIconHistory } from '../../scss/icon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
// Custom connector for Colorlib style
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
}));

// Custom step icon for Colorlib style
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: ownerState.completed ? '#784af4' : ownerState.active ? '#f48fb1' : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: ownerState.completed ? '2px solid #784af4' : 'none',
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? '✔' : active ? <div style={{ borderRadius: '50%', width: '10px', height: '10px', backgroundColor: '#784af4' }} /> : null}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
};

// Steps to be displayed
const steps = ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];

const OrderHistoryDetail = () => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        // Fetch product data from the API
        const fetchProducts = async () => {
            const response = await fetch('https://66f127da41537919154fc1b0.mockapi.io/plant');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%', height: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display="flex" alignItems="center">
                    <Link
                    style={{ textDecoration: 'none', display: 'flex', justifyContent: 'flex-end', width: '100%',color:'black',paddingBottom:10 }}
                    components={Link}
                    to='/userlist/orderhistory'
                    >
                    <ArrowBackIcon />
                      <Typography variant="h8"  sx={{fontWeight:'bold'}}>
                        Order detail
                      </Typography>
                    </Link>
                      </Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h8" sx={{ color: '#FA8232', textDecoration: 'none' }}>
                        Leave to rating
                      </Typography>
                      <ArrowForwardIcon sx={{ marginLeft: 0.5, color: '#FA8232' }} />
                      </Box>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #F7E99E',
                        padding: 5,
                        backgroundColor: '#FDFAE7',
                        display: 'flex',
                        alignItems: 'self-end',
                    }}
                >
                    <Box sx={{ marginRight: 45 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>#96459761</Typography>
                        <Typography>4 Products•Order Placed in 17 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 32, color: '#2DA5F3' }}>$1199.00</Typography>
                </Box>
                <Typography sx={{ fontSize: 15 }} gutterBottom>
                    Order expected arrival 23 Jan, 2021
                </Typography>
                {/* Stepper for order status */}
                <Stack sx={{ width: '100%' }} spacing={4}>
                    <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>

                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Order Activity</Typography>
                </Box>

                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <Done />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Your order has been delivered. Thank you for shopping at Clicon!</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>

                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <UserIconHistory />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Our delivery man (John Wick) has picked up your order for delivery.</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>

                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <LocalIcon />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Your order has been delivered. Thank you for shopping at Clicon!</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <InWay />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Your order is on the way to the (last mile) hub.</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <CompleteIcon />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Your order is successfully verified.</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <ConfirmIcon />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography>Your order has been confirmed.</Typography>
                        <Typography sx={{ color: '#77878F' }}>23 Jan, 2021 at 7:32 PM</Typography>
                    </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Typography sx={{ fontSize: 20, marginTop: 5 }}>Product (02)</Typography>
            </Paper>

            <Paper sx={{ mt: 2 }}>
                <TableContainer>
                    {/* Table Content */}
                    <Table
                        sx={{
                            minWidth: 650,
                            border: 1,
                            borderColor: '#E4E7E9',
                            width: '100%',
                            backgroundColor: '#F2F4F5',
                        }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Products</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Sub-Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell align="center" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={product.image} alt={product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="right">${product.price}</TableCell>
                                    <TableCell align="right">1</TableCell>
                                    <TableCell align="right">${product.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mt: 2, padding: 5 }}>
                        <Typography sx={{ fontSize: 20, marginBottom: 2 }}>Billing Address</Typography>
                        <Typography>Nhat Sang</Typography>
                        <Typography sx={{ color: '#77878F' }}>77 Ly Chinh Thang St., Ward 8, Dist. 3</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                            <Typography>Phone Number:</Typography>
                            <Typography sx={{ color: '#77878F', marginLeft: 1 }}>0123 456 789</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                    <Box sx={{ mt: 2, padding: 5 }}>
                        <Typography sx={{ fontSize: 20, marginBottom: 2 }}>Billing Address</Typography>
                        <Typography>Nhat Sang</Typography>
                        <Typography sx={{ color: '#77878F' }}>77 Ly Chinh Thang St., Ward 8, Dist. 3</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                            <Typography>Phone Number:</Typography>
                            <Typography sx={{ color: '#77878F', marginLeft: 1 }}>0123 456 789</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                    <Box sx={{ mt: 2, padding: 5 }}>
                        <Typography sx={{ fontSize: 20, marginBottom: 2 }}>Billing Address</Typography>
                        <Typography>Nhat Sang</Typography>
                        <Typography sx={{ color: '#77878F' }}>77 Ly Chinh Thang St., Ward 8, Dist. 3</Typography>
                        <Box sx={{ display: 'flex   ', }}>
                            <Typography>Phone Number:</Typography>
                            <Typography sx={{ color: '#77878F' }}>0123 456 789</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderHistoryDetail;
