import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircleIcon } from '../../scss/icon';

const FAQ = () => {
  const faqs = [
    {
      question: 'Chồi Xinh có giao hàng tận nơi không?',
      answer: 'Có, Chồi Xinh cung cấp dịch vụ giao hàng tận nơi cho khách hàng.',
    },
    {
      question: 'Làm sao để chọn cây thích hợp với mình?',
      answer: 'Bạn có thể tham khảo hướng dẫn trên website hoặc liên hệ với chúng tôi để được tư vấn.',
    },
    {
      question: 'Mình đặt hàng trên Website như thế nào?',
      answer: 'Bạn chỉ cần chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán.',
    },
    {
      question: 'Nếu cây mua về có vấn đề phải làm sao?',
      answer: 'Chúng tôi có chính sách đổi trả trong trường hợp sản phẩm gặp vấn đề.',
    },
    {
      question: 'Chồi xinh có gói quà không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ gói quà cho sản phẩm.',
    },
  ];

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 2 }}>
        <Paper sx={{ padding: 5,borderRadius:2,marginBottom:5 }}>
        <Typography variant="h6" sx={{marginBottom:2,fontWeight:'bold'}}>Chồi Xinh có giao hàng tận nơi không?</Typography>
        <Typography variant="body2">
          Chồi Xinh nhận giao hàng tận nơi đối với tất cả sản phẩm trong nội TPHCM. Tùy vào mỗi khu vực và giá trị đơn hàng sẽ có mức phí ship khác nhau hoặc miễn phí ship. Để biết chi tiết hơn, quý khách vui lòng xem tại "Quy định giao hàng" hoặc có thể liên hệ để chúng mình tư vấn thêm nhé!
        </Typography>
      </Paper>
      <Typography variant="h4" align="center" gutterBottom>
        Câu Hỏi Thường Gặp
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon />
            <Typography sx={{ marginLeft: 2 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      
    </Box>
  );
};

export default FAQ;
