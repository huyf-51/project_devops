import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OrderShow = ({ currentUser }) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const { orderId } = useParams();
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: orderId,
        },
        onSuccess: () => navigate('/orders'),
    });

    const getOrderById = async () => {
        const res = await axios.get(`/api/orders/${orderId}`);
        setOrder(res.data);
    };

    useEffect(() => {
        getOrderById();
    }, []);

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div className="container">Order Expired</div>;
    }

    if (order?.ticket?.price) {
        console.log('order>>>', order.ticket);
        return (
            <div className="container">
                Time left to pay: {timeLeft} seconds
                <StripeCheckout
                    token={({ id }) => doRequest({ token: id })}
                    stripeKey="pk_test_51P4jvJHcPdACl8TQLxq79MR6ED7VkB4BUt2015UBOHuDl835c9w3PpOkxWC555BZjCdbS5nmwfQ1w9PAQMDig3WI00xES8sEA2"
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                />
                {errors}
            </div>
        );
    } else {
        return <>...</>;
    }
};

export default OrderShow;
