import useRequest from '../../hooks/use-request';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TicketShow = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const getTicket = async () => {
        const res = await axios.get(`/api/tickets/${ticketId}`);
        setTicket(res.data);
    };
    useEffect(() => {
        getTicket();
    }, []);
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => navigate(`/orders/${order.id}`),
    });

    return (
        <div className="container">
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className="btn btn-primary">
                Purchase
            </button>
        </div>
    );
};

export default TicketShow;
