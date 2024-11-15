import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { PaymentSuccessfully } from "../../scss/icon";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [PaymentSuccessDetails, setPaymentSuccessDetails] = useState({
    amount: null,
    bankCode: null,
    bankTranNo: null,
    cardType: null,
    orderInfo: null,
    payDate: null,
    responseCode: null,
    tmnCode: null,
    transactionNo: null,
    transactionStatus: null,
    txnRef: null,
    secureHash: null,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl.split("?")[1]);

    const newPaymentSuccessDetails = {
      amount: params.get("vnp_Amount"),
      bankCode: params.get("vnp_BankCode"),
      bankTranNo: params.get("vnp_BankTranNo"),
      cardType: params.get("vnp_CardType"),
      orderInfo: params.get("vnp_OrderInfo"),
      payDate: params.get("vnp_PayDate"),
      responseCode: params.get("vnp_ResponseCode"),
      tmnCode: params.get("vnp_TmnCode"),
      transactionNo: params.get("vnp_TransactionNo"),
      transactionStatus: params.get("vnp_TransactionStatus"),
      txnRef: params.get("vnp_TxnRef"),
      secureHash: params.get("vnp_SecureHash"),
    };

    setPaymentSuccessDetails(newPaymentSuccessDetails);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://exe201be.io.vn/api/payment/createpayment`,
          {
            params: {
              vnp_Amount: newPaymentSuccessDetails.amount || "",
              vnp_BankCode: newPaymentSuccessDetails.bankCode || "",
              vnp_BankTranNo: newPaymentSuccessDetails.bankTranNo || "",
              vnp_CardType: newPaymentSuccessDetails.cardType || "",
              vnp_OrderInfo: newPaymentSuccessDetails.orderInfo || "",
              vnp_PayDate: newPaymentSuccessDetails.payDate || "",
              vnp_ResponseCode: newPaymentSuccessDetails.responseCode || "",
              vnp_TmnCode: newPaymentSuccessDetails.tmnCode || "",
              vnp_TransactionNo: newPaymentSuccessDetails.transactionNo || "",
              vnp_TransactionStatus: newPaymentSuccessDetails.transactionStatus || "",
              vnp_TxnRef: newPaymentSuccessDetails.txnRef || "",
              vnp_SecureHash: newPaymentSuccessDetails.secureHash || "",
            },
          }
        );

        console.log("PaymentSuccess response:", response.data);
      } catch (error) {
        navigate("/"); // Điều hướng về trang chủ nếu có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAmount = (amount) => {
    if (!amount) return "N/A";
    const formattedAmount = (parseFloat(amount) / 100).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  };

  const formatPayDate = (payDate) => {
    if (!payDate) return "N/A";
    const date = new Date(
      payDate.slice(0, 4) +
      "-" +
      payDate.slice(4, 6) +
      "-" +
      payDate.slice(6, 8)
    );
    return date.toLocaleDateString("vi-VN");
  };

  // Hàm gọi API checkoutoncashdelivery khi nhấn "Back to Home"
  const handleBackToHome = async () => {
    const paymentData = JSON.parse(localStorage.getItem("payment")) || {};
    const orderId = paymentData.orderId;
    const couponId = paymentData.couponId;
    const orderNote = paymentData.orderNote;

    const token = localStorage.getItem("userData");

    try {
      const response = await axios.post(
        `https://exe201be.io.vn/api/order/checkoutoncashdelivery`,
        {
          orderId,  
          couponId,
          description: orderNote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        }
      );

      console.log("Checkout response:", response.data); // In ra kết quả từ API
      navigate("/"); // Điều hướng về trang chủ sau khi gọi API
    } catch (error) {
      console.error("Error calling checkout API:", error);
    }
  };

  return (
    <Box className="min-h-screen flex justify-center items-center py-10 bg-gray-100" sx={{marginTop:20}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {/* Payment Success Details */}
          <Box sx={{
            width: '50%',
            padding: 3,
            backgroundColor: 'white',
            marginRight: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // Vertically center the content
            alignItems: 'center'
          }}>
            <Typography variant="h6" gutterBottom>
              Thông tin thanh toán thành công
            </Typography>
            <Typography variant="body1">
              <strong>Tổng tiền:</strong> {formatAmount(PaymentSuccessDetails.amount)}
            </Typography>
            <Typography variant="body1">
              <strong>Ngân hàng:</strong> {PaymentSuccessDetails.bankCode || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Ngày thanh toán:</strong> {formatPayDate(PaymentSuccessDetails.payDate)}
            </Typography>
            <Typography variant="body1">
              <strong>Thanh toán bằng:</strong> {PaymentSuccessDetails.cardType || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>OrderId:</strong> {PaymentSuccessDetails.orderInfo || 'N/A'}
            </Typography>
          </Box>

          {/* Payment Success Confirmation */}
          <Box sx={{ width: '48%', padding: 3, backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
              <PaymentSuccessfully />
            </Box>
            <Typography variant="h6" align="center" sx={{ color: 'green', fontWeight: 'bold' }}>
              Payment Success!
            </Typography>
            <Typography variant="body1" align="center" gutterBottom sx={{ color: 'green' }}>
              Your Payment of {formatAmount(PaymentSuccessDetails.amount)} was successful on{' '}
              {formatPayDate(PaymentSuccessDetails.payDate)}.
            </Typography>
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', bottom: 20, width: '100%' }}>
        <Button
          variant="outlined"
          onClick={handleBackToHome} // Gọi handleBackToHome khi nhấn nút
          sx={{borderColor:'green',color:'green',marginBottom:6.5}}
        >
          Back to Home
        </Button>
      </Box>
    </Box> 
  );
};

export default PaymentSuccess;
