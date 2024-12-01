import axios from 'axios';
import { useEffect, useState } from 'react';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const res = await axios.get('/api/orders');
            setOrders(res.data);
        } catch {}
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="container">
            <h2>Order List</h2>
            <ul className="container">
                {orders.map((order) => {
                    return (
                        <li key={order.id}>
                            {order.ticket.title} - {order.status}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Order;
